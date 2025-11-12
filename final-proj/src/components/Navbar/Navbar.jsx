import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../services/auth";
import "./Navbar.css";
import fishImg from "../../assets/Fish.png";


const Navbar = () => {
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">A Cat's Journey</Link>
      </div>
      <div className="navbar-menu">
        {currentUser ? (
          <>
            <div className="img-crop">
              <img src={fishImg} alt="A fish facing left with an 'x' for eyes" />
            </div>
            <Link to="/dashboard" className="navbar-item">Game Progress</Link>
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