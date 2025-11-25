import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Options.css";

// description
const Options = ({ currNode, setNewIndex, restart }) => {

  const navigate = useNavigate();

    const clickOption = (nextText) => {
    if (nextText === -1) {
      // restart();
      navigate("/gameover");
    } else {
      setNewIndex(nextText);
    }
  };

  // if no current node
  if (!currNode) {
    return <div>Loading...</div>;
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