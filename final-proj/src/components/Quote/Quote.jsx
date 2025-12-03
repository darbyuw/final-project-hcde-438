import React from "react";
import { useState, useEffect, useRef} from "react";
import "./Quote.css";
import apiKey from "../../secrets.jsx";

// This component is rendered directly above the Options component. It takes in the quote category (String) that is used to 
// determine the type of quote that is fetched at each location in the game. This component fetches data from the 
// quote ninja API and returns the quote and author. 
const Quote = ({ category }) => {

const [quoteData, setQuoteData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const lastCategory = useRef(null);

// This hook operates when there is a new category. It fetches the quote from the quote ninja API. 
useEffect(() => {
  // Only fetch if the category changed
  if (lastCategory.current === category) return;

  lastCategory.current = category;

  // This asyncronous function fetches data from the Quote Ninja API. It sets an error message and loading message 
  // that are displayed to the user. 
  const fetchQuote = async () => {
      setLoading(true);
      setError(null);

      const url = "https://api.api-ninjas.com/v2/randomquotes?categories=" + category ;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {'X-Api-Key': apiKey}
      });
      if (!response.ok) {
        throw new Error(`error status: ${response.status}`);
      }
        const data = await response.json();
        setQuoteData(data);
      } 
      catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuote();
  }, [category]);

  if (loading) {
    return <div className="quote-content">
              <div className="api-loading">Loading quote...</div>
            </div>;
  }

  if (error) {
    return <div className="quote-content">
        <div className="api-error">Error loading quote: {error}</div>
    </div>;
  }

return (
    <div className="quote-content">
        {quoteData && quoteData.length > 0 && (
          <div className="quote-section">
              <p className="quote-text">"{quoteData[0].quote}" - {quoteData[0].author}</p>
          </div> 
        )}
    </div>
    );
    };

    export default Quote;