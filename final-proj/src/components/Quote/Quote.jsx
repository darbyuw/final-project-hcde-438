import React from "react";
import { useState, useEffect } from "react";
import "./Quote.css";
import apiKey from "../../secrets.jsx";


const Quote = () => {

const [quoteData, setQuoteData] = useState(null);
  useEffect(() =>{
    const fetchQuote = async () => {
      try {
        const response = await fetch("https://api.api-ninjas.com/v2/quotes", {
          method: "GET",
          headers: {'X-Api-Key': apiKey}
      });
        const data = await response.json();
        setQuoteData(data[0]);
      } 
      catch (error) {
        console.log("Error fetching quote:", error.message);
      }
    };
    fetchQuote();
  }, []);

  // TODO: style the quote component to fit inside the correct div box
return (
    <div className="quote-content">
        {quoteData && (
            <> 
                <div className="quote-section">
                    <p className="quote-text">"{quoteData.quote}"</p>
                </div> 
            </>
        )}
    </div>
    );
    };

    export default Quote;