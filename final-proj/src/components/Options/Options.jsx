import React from "react";
import { useState, useEffect } from "react";
import "./Options.css";


const Options = () => {

    // TODO: implement options functionality

return (    
    <div className="options-content">
        <div className="question-section">
            <p>Question goes here</p>
        </div>
        <div className="options-section">
            <div className="option-item">Option 1</div>
            <div className="option-item">Option 2</div>
            <div className="option-item">Option 3</div>
            <div className="option-item">Option 4</div>
        </div>
    </div>
    );
};


export default Options;