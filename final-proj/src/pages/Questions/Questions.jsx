import { useState, useEffect} from "react";
import Quote from "../../components/Quote/Quote";
import Options from "../../components/Options/Options";
import textNodes from "../../textNodes";
import "./Questions.css";
// Import Firestore functions for creating documents and generating a server timestamp.
import { doc, setDoc, serverTimestamp, collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
// Import the initialized Firestore database instance from your configuration file.
import { db } from '../../services/firebase.js'; 
import { useAuth } from "../../context/AuthContext";
// Import the fish count from context
import { useContext } from 'react';
import { FishCountContext } from '../../context/FishCountContext.jsx';
import { useLocation } from 'react-router-dom';



const Questions = () => {

  // TODO: implement a background image change with usestate or useeffect (similar to dark/light mode from class example)

  // get the current user to be able to store to their firebase
  const { currentUser } = useAuth();
  const { fishCount, setFishCount } = useContext(FishCountContext);
  const location = useLocation();

  // set the initial index, fish, and quote category
  const [textNodeIndex, setTextNodeIndex] = useState(1);
  const [quoteCategory, setQuoteCategory] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(true);

  // set the inital node
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
  // at the start when it is null, we want to set the quote category. 
  if (quoteCategory === null) {
    setQuoteCategory(textNode.category);
  }

  useEffect(() => {
    const loadProgress = async () => {
      const startNewGame = location.state?.startNewGame;

      if (startNewGame) {
        setTextNodeIndex(1);
        setFishCount(0);
        setLoadingProgress(false);
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

          setTextNodeIndex(savedIndex);
          setFishCount(savedFishCount);
        } else {
          setTextNodeIndex(1);
          setFishCount(0);
        } 
      } catch (err) {
          console.error("Error loading progress from Firebase: ", err);
          setTextNodeIndex(1);
          setFishCount(0);
      } finally {
        setLoadingProgress(false);
      }
    };
    loadProgress();
  }, [currentUser]);
  
// update fish count & category at new nodes
  useEffect(() => {
    if (textNode?.fish) {
      setFishCount(prevCount => prevCount + textNode.fish);
    }
    if (textNode?.category) {
    setQuoteCategory(String(textNode.category));
    }
  }, [textNodeIndex, textNode]);

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
        // Create a Firestore document reference for the favorite item.
        // The path is 'users/{userId}/favorites/{imageDate}'.
        const progressRef = doc(db, 'users', currentUser.uid, 'progress', String(indexToStore));
        // Create or overwrite the document at the specified reference with new data.
        await setDoc(progressRef, {
            // Store the index of the current node
            index: indexToStore,
            // Store the current fish count
            fishCount: fishCount,
            // Add a server-side timestamp to record when teh user landed on that node
            createdAt: serverTimestamp(),
        });
        // Notify the user of the successful operation.
        console.log('Progress saved!');
        // If an error occurs while writing to Firestore...
    } catch (err) {
        // ...log the full error to the console for debugging purposes.
        console.error("Error saving progress: ", err);
        // ...and show a generic error message to the user.
        alert('Failed to save progress.');
    }
  };

  const handleRestart = () => {
    console.log("Restarting game");
    setTextNodeIndex(1);
    setFishCount(0);
    setQuoteCategory("life");
  };

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