import { useState } from "react";
import Quote from "../../components/Quote/Quote";
import Options from "../../components/Options/Options";
import textNodes from "../../textNodes";
import "./Questions.css";

const Questions = () => {

  // get the current index from firebase ???
  // set the current index
  const [textNodeIndex, setTextNodeIndex] = useState(1);
  const [fishCount, setFishCount] = useState(0);

  // set the current node
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
  const getCurrentNode = (nextIndex) => {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
    if (textNode?.fish) {
      setFishCount(fishCount + textNode.fish);
      console.log(fishCount);
    }
    setTextNodeIndex(nextIndex);
  };

  // restarting the game
  const handleRestart = () => {
    setTextNodeIndex(1);
    setFishCount(0);
  };

  return (
    <div className="questions-container">
      <div className="questions-content">
        <Quote />
        <Options currNode={ textNode }
          setNewIndex={ getCurrentNode }
          restart={ handleRestart }/>
      </div>
    </div>
  );
};

export default Questions;