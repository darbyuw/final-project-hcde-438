import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../services/auth";
import "./Navbar.css";
import fishImg from "../../assets/Fish.png";
import catImg from "../../assets/cat_logo.png";
import { useContext } from "react";
import { FishCountContext } from "../../context/FishCountContext";


const Navbar = () => {
  const { currentUser } = useAuth();
  const { fishCount } = useContext(FishCountContext);

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="img-cat">
          <img src={catImg} alt="A sketch of a cat's face looking forward" />
        </div>
        <div className="game-title" aria-label="Return to home page">
          <Link to="/">A Cat's Journey</Link>
        </div>
      </div>
      <div className="navbar-menu">
        {currentUser ? (
          <>
            <div className="fish-display">
              <div className="fish-count-text" aria-label="Your current fish count">
                Fish Count: { fishCount }
              </div>
              <div className="fish-grid">
                {Array.from({ length: fishCount }).map((_, index) => (
                  <div key={index} className="img-crop" aria-label="A Fish">
                    <img src={fishImg} alt="A fish facing left with an 'x' for eyes" />
                  </div>
                ))}
              </div>
            </div>
            <Link to="/" className="navbar-item" aria-label="Save your progress and return to the home page">Save & Quit</Link>
            <button onClick={handleLogout} className="navbar-button" aria-label="Logout your account and return to home page">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-item" aria-label="Login to an exisitng account">Login</Link>
            <Link to="/register" className="navbar-item" aria-label="Create a new account">Create Account</Link>
          </>
        )}
      </div>
    </nav>
  );
};
export default Navbar;