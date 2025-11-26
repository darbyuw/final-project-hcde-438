import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Options.css";

// description
const Options = ({ currNode, setNewIndex, setFishCount}) => {

  const navigate = useNavigate();

  const clickOption = (nextText) => {
    if (nextText === -1) {
      navigate("/gameover");
    } else {
      setNewIndex(nextText);
    }
  };

  // if no current node
  if (!currNode) {
    return <div>Loading...</div>;
  }

  if (currNode?.fish) {

      setFishCount(prevCount => prevCount + textNode.fish);

      // setFishCount(fishCount + textNode.fish);
      console.log("fish count set within options: " + fishCount);
      // right now it deosnt save the fish count until after the user clicks on an option, i need it to save the fish count as soon as the user comes across the room with more fish.
    }

  // I looked up the map function, it is like a for loop that returns an array
  return (    
    <div className="options-content">
      <div className="question-section">
        <p>{currNode.text}</p>
      </div>
      <div className="options-section">
        {currNode.options.map((option, index) => (
          <div 
            key={index}
            className="option-item"
            onClick={() => clickOption(option.nextText)}
          >
            {option.text}
          </div>
        ))}
      </div>
    </div>

    );
};

export default Options;