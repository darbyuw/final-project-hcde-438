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
        <Link to="/">A Cat's Journey</Link>
      </div>
      <div className="navbar-menu">
        {currentUser ? (
          <>
            <div className="fish-display">
              {Array.from({ length: fishCount }).map((_, index) => (
                <div key={index} className="img-crop">
                  <img src={fishImg} alt="A fish facing left with an 'x' for eyes" />
                </div>
              ))}
            </div>
            <Link to="/" className="navbar-item">Save & Quit</Link>
            {/* <Link to="/profile" className="navbar-item">Profile</Link> */}
            <button onClick={handleLogout} className="navbar-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-item">Login</Link>
            <Link to="/register" className="navbar-item">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};
export default Navbar;