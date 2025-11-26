import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../services/auth";
import "./Navbar.css";
import fishImg from "../../assets/Fish.png";
import catImg from "../../assets/cat_logo.png";


const Navbar = () => {
  const { currentUser } = useAuth();

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

// when the fish count increases, the number of fish displayed on teh nav bar should reflect that
// pass fishcount variable into the navbar component so that the navbar automaticcaly has access to the number
// 

// {currNode.options.map((option, index) => (
//           <div 
//             key={index}
//             className="option-item"
//             onClick={() => clickOption(option.nextText)}
//           >
//             {option.text}
//           </div>
//         ))}
export default Navbar;