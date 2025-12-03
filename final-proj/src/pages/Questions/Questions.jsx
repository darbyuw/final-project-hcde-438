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

// This function returns the Questions page which is the page that shows all of the game choices. This is a component that 
// renders the Qutoe and Options components. The game is played entirely within this page. 
const Questions = () => {
  const { currentUser } = useAuth();
  const { fishCount, setFishCount } = useContext(FishCountContext);
  const location = useLocation();
  const navigate = useNavigate();
  const isFirstLoad = useRef(true);
  const [textNodeIndex, setTextNodeIndex] = useState(1);
  const [quoteCategory, setQuoteCategory] = useState("life");
  const [loadingProgress, setLoadingProgress] = useState(true);

  // set the inital node
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);

  // This hook will run when there is a new user logged in. 
  useEffect(() => {
    // This function checks if a new game is being started, then loads the user's current progress from FireStore. 
    // It sets the textNodeIndex, fishCount, and quoteCategory to the information saved in FireStore. 
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
  
// Update fishCount and quoteCategory at new nodes only when there is a new category and fish are found. 
// This hook checks if the user has found five fish. If they have found five fish, then it navigates to the Game Over page 
// after three seconds. This allows the user to read the final location in the game before they are redirected to another page. 
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

  // This function sets the current node (this function is passed into the options component)
  // This funciton is called when the user clicks on an option. It takes in the index of the next node in the text node structure.\
  // It stores the users progress in FireStore and sets the textNodeIndex to the given nextIndex (number) 
  const getCurrentNode = (nextIndex) => {
    // store progress in firebase
    storeProgress(nextIndex);
    setTextNodeIndex(nextIndex);
  };

  // This is an asynchronous function that handles adding the users progress to Firestore. It takes in the current location
  // of the user in teh game in the form of indexToStore which is a number. 
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

  // This function is passed into the options component. It resets teh textNodeIndex, fishCount, and quoteCategory when the user
  // comes across a dead end in the game where the cat gets distracted.
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
    <div className="questions-container" title="Background showing a living room">
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