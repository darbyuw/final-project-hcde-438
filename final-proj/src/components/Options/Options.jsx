import React from "react";
import { useNavigate } from "react-router-dom";
import "./Options.css";
import { useContext } from "react";
import { FishCountContext } from '../../context/FishCountContext.jsx';


// description
const Options = ({ currNode, setNewIndex, onRestart}) => {

  const { fishCount } = useContext(FishCountContext);
  const navigate = useNavigate();


  const clickOption = (nextText) => {
    if (nextText === -1) {
      onRestart();
    } else if (fishCount >= 5) {
      navigate("/gameover");
    } else {
      setNewIndex(nextText);
    }
  };

  // if no current node
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