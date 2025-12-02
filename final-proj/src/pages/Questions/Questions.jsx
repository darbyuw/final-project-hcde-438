import { useState, useEffect, useRef} from "react";
import Quote from "../../components/Quote/Quote";
import Options from "../../components/Options/Options";
import textNodes from "../../textNodes";
import "./Questions.css";
import { doc, setDoc, serverTimestamp, collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../services/firebase.js'; 
import { useAuth } from "../../context/AuthContext";
import { useContext } from 'react';
import { FishCountContext } from '../../context/FishCountContext.jsx';
import { useLocation, useNavigate} from 'react-router-dom';

// DESCRIPTION
const Questions = () => {

  // TODO: implement a background image change with usestate or useeffect (similar to dark/light mode from class example)

  // get the current user to be able to store to their firebase
  const { currentUser } = useAuth();
  const { fishCount, setFishCount } = useContext(FishCountContext);
  const location = useLocation();
  const navigate = useNavigate();
  const isFirstLoad = useRef(true);

  // set the initial index, fish, and quote category
  const [textNodeIndex, setTextNodeIndex] = useState(1);
  const [quoteCategory, setQuoteCategory] = useState("life");
  const [loadingProgress, setLoadingProgress] = useState(true);

  // set the inital node
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);

  useEffect(() => {
    const loadProgress = async () => {
      const startNewGame = location.state?.startNewGame;

      if (startNewGame) {
        setTextNodeIndex(1);
        setFishCount(0);
        setLoadingProgress(false);
        isFirstLoad.current = false;
        return;
      }
      // load saved progress from firestore when it is not a new game:
      try {
        const progressCol = collection(db, 'users', currentUser.uid, 'progress');
        const q = query(progressCol, orderBy('createdAt', 'desc'), limit(1));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const lastProgress = querySnapshot.docs[0].data();
          const savedIndex = lastProgress.index;
          const savedFishCount = lastProgress.fishCount || 0;
          const savedNode = textNodes.find(node => node.id === savedIndex);

          setTextNodeIndex(savedIndex);
          setFishCount(savedFishCount);

          if (savedNode?.category) {
            setQuoteCategory(savedNode.category);
          }
        } else {
          setTextNodeIndex(1);
          setFishCount(0);
          setQuoteCategory("life");
        } 
      } catch (err) {
          console.error("Error loading progress from Firebase: ", err);
          setTextNodeIndex(1);
          setFishCount(0);  
          setQuoteCategory("life");
      } finally {
        setLoadingProgress(false);
        isFirstLoad.current = false;
      }
    };
    loadProgress();
  }, [currentUser]);
  
// update fish count and category at new nodes only when there is a new category and fish are found. 
  useEffect(() => {
    // dont go inside useEffect if we are on the first load
    if (isFirstLoad.current) {
      return;
    }

    if (textNode?.fish) {
      const newFishCount = fishCount + textNode.fish;
      setFishCount(newFishCount);
      if (newFishCount >= 5) {
        console.log("Game won! You collected", newFishCount, "fish!");
        setTimeout(() => {
          navigate("/gameover");
        }, 3000);
      } 
    }
    if (textNode?.category && textNode.category !== quoteCategory) {
    setQuoteCategory(String(textNode.category));
    }
    
  }, [textNodeIndex]);

  // set the current node (this function is passed into the options component)
  // This funciton is called when the user clicks on an option. It takes in the index of the next node in the text node tree. 
  const getCurrentNode = (nextIndex) => {
    // store progress in firebase
    storeProgress(nextIndex);
    setTextNodeIndex(nextIndex);
  };

   // Define an asynchronous function to handle adding the users progress to firestore.
  const storeProgress = async (indexToStore) => {
    if (!currentUser) {
      console.warn("No user logged in — skipping save.");
      return;
    }
    try {
        const progressRef = doc(db, 'users', currentUser.uid, 'progress', String(indexToStore));
        await setDoc(progressRef, {
            // Store the index of the current node
            index: indexToStore,
            // Store the current fish count
            fishCount: fishCount,
            // Add a server-side timestamp to record when teh user landed on that node
            createdAt: serverTimestamp(),
        });
        // console.log('Progress saved!');
    } catch (err) {
        console.error("Error saving progress: ", err);
        alert('Failed to save game progress. If you exit the game, your progress might not be saved.');
    }
  };

  const handleRestart = () => {
    setTextNodeIndex(1);
    setFishCount(0);
    setQuoteCategory("life");
  };

  if (loadingProgress) {
    return (
      <div className="questions-container">
        <div className="questions-content">
          <p>Loading your progress...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="questions-container">
      <div className="questions-content">
        <Quote category={ quoteCategory }/>
        <Options currNode={ textNode }
          setNewIndex={ getCurrentNode }
          onRestart= { handleRestart }
          />
      </div>
    </div>
  );
};

export default Questions;