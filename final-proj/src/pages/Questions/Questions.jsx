import { useState } from "react";
import Quote from "../../components/Quote/Quote";
import Options from "../../components/Options/Options";
import "./Questions.css";

const Questions = () => {

  return (
    <div className="questions-container">
      <div className="questions-content">
        <Quote />
        <Options />
      </div>
    </div>
  );
};

export default Questions;