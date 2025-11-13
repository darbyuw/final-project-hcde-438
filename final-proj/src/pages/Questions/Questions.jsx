import { useState } from "react";
// import AgeCalculator from "../../components/AgeCalculator/AgeCalculator";
// import CalculationHistory from "../../components/CalculationHistory/CalculationHistory";
import "./Questions.css";

const Questions = () => {
//   const [refreshTrigger, setRefreshTrigger] = useState(0);

//   const handleCalculate = () => {
//     // Trigger a refresh of the calculation history
//     setRefreshTrigger((prev) => prev + 1);
//   };


const [quoteData, setQuoteData] = useState(null);
  useEffect(() =>{
    const fetchQuote = async () => {
      try {
        const response = await fetch("https://zenquotes.io/api/quotes/");
        const data = await response.json();
        setQuoteData(data[0]);
      } 
      catch (error) {
        console.log("Error fetching quote:", error.message);
      }
    }
    fetchQuote();
  })

  return (
    <div className="questions-container">
      <h1>Next question here</h1>
      <div className="questions-content">
        {/* <AgeCalculator onCalculate={handleCalculate} />
        <CalculationHistory refreshTrigger={refreshTrigger} /> */}
        
      </div>
    </div>
  );
};

export default Questions;