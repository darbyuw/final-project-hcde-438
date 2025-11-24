import React from "react";
import { useState, useEffect } from "react";
import "./Quote.css";
import apiKey from "../../secrets.jsx";

const Quote = (category) => {

const [quoteData, setQuoteData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

  useEffect(() =>{
    const fetchQuote = async () => {

      try {
        const response = await fetch("https://api.api-ninjas.com/v2/quotes?categories=" + category, {
          method: "GET",
          headers: {'X-Api-Key': apiKey}
      });
      if (!response.ok) {
        throw new Error(`error status: ${response.status}`);
      }
        const data = await response.json();
        setQuoteData(data[0]);
      } 
      catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuote();
  }, []);

  // change the style of this loading !!
  if (loading) {
    return <div>Loading...</div>;
  }
  // style this error message too !!
  if (error) {
    return <div>Error: {error}</div>;
  }

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