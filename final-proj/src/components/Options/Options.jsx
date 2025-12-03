import React from "react";
import { useNavigate } from "react-router-dom";
import "./Options.css";
import { useContext } from "react";
import { FishCountContext } from '../../context/FishCountContext.jsx';


// This component takes in the current text node, the setNewIndex function, and the onRestart function. 
// It returns the options content with the locaiton description and option buttons. 
const Options = ({ currNode, setNewIndex, onRestart}) => {

  const { fishCount } = useContext(FishCountContext);
  const navigate = useNavigate();

  // This function takes in nextText (number) which indicates the index of the next node. 
  // It detemrines if the game should be restarted, Game Over page rendered, or a new index set.  
  const clickOption = (nextText) => {
    if (nextText === -1) {
      onRestart();
    } else if (fishCount >= 5) {
      navigate("/gameover");
    } else {
      setNewIndex(nextText);
    }
  };

  // If no current node
  if (!currNode) {
    return <div>Loading...</div>;
  }

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
            tabIndex={0}
            onClick={() => clickOption(option.nextText)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") { // use enter and space key for navigation!
                event.preventDefault();  
                clickOption(option.nextText);
              }
            }}
            role="button"    
            aria-pressed="false"
            aria-label={option.text}
          >
            {option.text}
          </div>
        ))}
      </div>
    </div>

    );
};

export default Options;