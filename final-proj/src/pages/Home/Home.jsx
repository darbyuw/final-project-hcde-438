/**
 * This is the Home page that is rendered by the root of the web app. This page checks if a user is logged in, and 
 * if they have saved game progress on Firebase. 
 */
import { Link, useNavigate} from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../services/firebase.js';
import "./Home.css";

// This function the home page and all interactive elements on the page. 
const Home = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [savedProgress, setSavedProgress] = useState(false);
  const [checkingProgress, setCheckingProgress] = useState(true);

  useEffect(() => {
    // This function checks if the user has exisiting game progress saved in Firestore. If there is saved progress, then 
    // the variable savedProgress is set to 'true'. Otherwise, savedProgress is set to 'false'.
    const checkIfProgress = async () => {
      if (!currentUser) {
        setCheckingProgress(false);
        return;
      }

      try {
        const progressCol = collection(db, 'users', currentUser.uid, 'progress');
        const q = query(progressCol, orderBy('createdAt', 'desc'), limit(1));
        const querySnapshot = await getDocs(q);

        setSavedProgress(!querySnapshot.empty);
      } catch (err) {
          console.error("Error checking for saved progress from Firebase: ", err);
          setSavedProgress(false);
      } finally {
          setCheckingProgress(false);
      }
    };
    checkIfProgress();
  }, [currentUser]);

  // This function is called when the user clicks on the Start New Game button, it navigates to the questions page
  // and sets the startNewGame state to 'true' to allow for the beginning of the game to occur. 
  const handleStartNewGame = () => {
    navigate("/questions", {state: { startNewGame: true }});
  }

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to A Cat's Journey</h1>
        <p className="home-description">
          Guide your cat towards fish with this choose-your-own adventure game. 
          Create an account to save your game progress.
        </p>
        <p className="home-description">Collect <strong>FOUR fish</strong> to win.</p>
        
        <div className="cta-buttons">
          {currentUser ? (
            <>
              <Link to="/questions" className="cta-button primary">
                {checkingProgress ? "Loading ..." : savedProgress ? "Continue Journey" : "Start Journey"}
              </Link>
              {savedProgress && (
                <button onClick={handleStartNewGame} className="cta-button secondary" >
                Start New Game </button>
              )}
            </>
          ) : (
            <>
              <Link to="/login" className="cta-button primary" aria-label="Log in to an exisitng account">
                Login
              </Link>
              <Link to="/register" className="cta-button secondary" aria-label="Create a new account">
                Create Account
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;