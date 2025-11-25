import { useState } from "react";
import Quote from "../../components/Quote/Quote";
import Options from "../../components/Options/Options";
import textNodes from "../../textNodes";
import "./Questions.css";
// Import Firestore functions for creating documents and generating a server timestamp.
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
// Import the initialized Firestore database instance from your configuration file.
import { db } from '../../services/firebase.js'; 
import { useAuth } from "../../context/AuthContext";


const Questions = () => {

  // TODO: implement a background image change with usestate or useeffect (similar to dark/light mode from class example)

  const { currentUser } = useAuth();

  // set the initial index, fish, and quote category
  const [textNodeIndex, setTextNodeIndex] = useState(1);
  const [fishCount, setFishCount] = useState(0);
  const [quoteCategory, setQuoteCategory] = useState(null);

  // set the inital node
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
  // console.log(textNode)
  if (quoteCategory === null) {
    console.log(textNode.category)
    setQuoteCategory(textNode.category);
    console.log(quoteCategory);
  }

  // set the current node (this function is passed into the options component)
  const getCurrentNode = (nextIndex) => {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
    if (textNode?.fish) {
      setFishCount(fishCount + textNode.fish);
      console.log(fishCount);
    }
    
    setQuoteCategory(textNode.category);
    console.log(quoteCategory);

    // store progress in firebase
    storeProgress();
    
    setTextNodeIndex(nextIndex);
  };

     // Define an asynchronous function to handle adding the users progress to firestore.
  const storeProgress = async () => {
    try {
        // Create a Firestore document reference for the favorite item.
        // The path is 'users/{userId}/favorites/{imageDate}'.
        const progressRef = doc(db, 'users', currentUser.uid, 'current node', textNodeIndex);
        // Create or overwrite the document at the specified reference with new data.
        await setDoc(progressRef, {
            // Store the title of the APOD.
            index: textNodeIndex,
            // Add a server-side timestamp to record when it was favorited.
            createdAt: serverTimestamp(),
        });
        // Notify the user of the successful operation.
        alert('Progress saved!');
        // If an error occurs while writing to Firestore...
    } catch (err) {
        // ...log the full error to the console for debugging purposes.
        console.error("Error saving progress: ", err);
        // ...and show a generic error message to the user.
        alert('Failed to save progress.');
    }
  };

  // restarting the game
  const handleRestart = () => {
    setTextNodeIndex(1);
    setFishCount(0);
  };

  return (
    <div className="questions-container">
      <div className="questions-content">
        <Quote category={ quoteCategory }/>
        <Options currNode={ textNode }
          setNewIndex={ getCurrentNode }
          restart={ handleRestart }/>
      </div>
    </div>
  );
};

export default Questions;