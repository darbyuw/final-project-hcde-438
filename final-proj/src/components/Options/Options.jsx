import React from "react";
import { useState, useEffect } from "react";
import "./Options.css";

// description
const Options = ({ currNode, setNewIndex, restart }) => {

    // // loop through all options within the current node
    // textElement.innerText = textNode.text;
    // while (optionButtonsElement.firstChild) {
    //     optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    // }
    // // loop thorugh options: TODO: PUT THIS FUNCTIONALITY AROUND THE RETURN STATEMENT TO CHANGE NUMBEr OF OPTION-ITEMS
    // nextNode.options.forEach(option => {
    //     if (showOption(option)) {
    //         const button = document.createElement('button');
    //         button.innerText = option.text;
    //         button.classList.add('btn');
    //         button.addEventListener('click', () => selectOption(option));
    //         optionButtonsElement.appendChild(button);
    //     }
    // })

    // const nextTextNode = option.nextText;
    // if (nextTextNode <= 0) {
    //     return <endGame />; // return end game component if game is over
    // }
    // return (    
    //     <div className="options-content">
    //         <div className="question-section">
    //             <p>{currNode.text}</p>
    //         </div>
    //         <div className="options-section">
    //             for each { option } in { currNode.options }
    //             <div className="option-item">{option.text}</div>
    //             <div className="option-item">{option.text}</div>
    //             <div className="option-item">{option.text}</div>
    //             <div className="option-item">{option.text}</div>
    //         </div>
    //     </div>

    const clickOption = (nextText) => {
    if (nextText === -1) {
      restart();
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