import { Link } from "react-router-dom";
import "./GameOver.css";


const Gameover = () => {

    // reset game progress in firestore!!!
    
    return (
        <div className="gameover-container">
            <div className="gameover-content">
                <p>Game over</p>
                <Link to="/questions" className="cta-button primary">
                    Restart
                </Link>
            </div>
        </div>
    );

};


export default Gameover;