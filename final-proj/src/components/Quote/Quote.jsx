import React from "react";
import { useState, useEffect } from "react";
import "./Quote.css";


const Quote = () => {

const [quoteData, setQuoteData] = useState(null);
  useEffect(() =>{
    const fetchQuote = async () => {
      try {
        const response = await fetch("https://zenquotes.io/api/random");
        const data = await response.json();
        setQuoteData(data[0]);
      } 
      catch (error) {
        console.log("Error fetching quote:", error.message);
      }
    };
    fetchQuote();
  }, []);

 // TODO: add this to the questions page and render the questions page after logging in
return (
    <div className="quote-content">
        {quoteData && (
            <> 
                <div className="quote-section">
                    <p className="quote-text">"{quoteData.q}"</p>
                </div> 
            </>
        )}
    </div>
    );
    };

    export default Quote;