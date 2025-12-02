import { Link } from "react-router-dom";
import "./GameOver.css";
import { useContext } from "react";
import { FishCountContext } from '../../context/FishCountContext.jsx';


const Gameover = () => {
    const { fishCount } = useContext(FishCountContext);

    return (
        <div className="gameover-container">
            <div className="gameover-content">
                <h1>Game over!</h1>
                <p>You successfully collected {fishCount} fish</p>
                <Link to="/questions" className="cta-button primary">
                    Restart
                </Link>
            </div>
        </div>
    );

};


export default Gameover;