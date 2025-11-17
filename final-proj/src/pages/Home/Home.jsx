import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Home.css";

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>A Cat's Journey</h1>
        <p className="home-description">
          Guide your cat towards fish with this choose-your-own adventure game. 
          Create an account to save your game progress.
        </p>
        
        <div className="cta-buttons">
          {currentUser ? (
            <Link to="/questions" className="cta-button primary">
              Continue Journey
            </Link>
          ) : (
            <>
              <Link to="/login" className="cta-button primary">
                Login
              </Link>
              <Link to="/register" className="cta-button secondary">
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