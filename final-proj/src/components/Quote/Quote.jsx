import React from "react";
import { useState, useEffect, useRef} from "react";
import "./Quote.css";
import apiKey from "../../secrets.jsx";

const Quote = ({ category }) => {

const [quoteData, setQuoteData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const lastCategory = useRef(null);

useEffect(() => {
  // Only fetch if the category changed
  if (lastCategory.current === category) return;

  lastCategory.current = category;

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
        // console.log(data)
        setQuoteData(data);
        // console.log(quoteData)
      } 
      catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuote();
  }, [category]);

  // change the style of this loading !!
  if (loading) {
    return <div className="quote-content">
              <div className="api-loading">Loading...</div>
            </div>;
  }
  // style this error message too !!
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