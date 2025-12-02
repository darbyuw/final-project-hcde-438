import { Link } from "react-router-dom";
import "./GameOver.css";
import { useContext } from "react";
import { FishCountContext } from '../../context/FishCountContext.jsx';
import { useAuth } from "../../context/AuthContext";
import { doc, setDoc, serverTimestamp, collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../services/firebase.js'; 


const Gameover = () => {
    const { fishCount } = useContext(FishCountContext);
    const { currentUser } = useAuth();

    // Reset firestore progress so that the game will reset at the beginning:
    const resetProgress = async () => {
        try {
            const progressRef = doc(db, 'users', currentUser.uid, 'progress', String(1));
            await setDoc(progressRef, {
                // Store the index of the start node
                index: 1,
                // Reset the current fish count
                fishCount: 0,
                // Add a server-side timestamp to record when the user finished the game
                createdAt: serverTimestamp(),
            });
            console.log('Progress saved at endgame!');
        } catch (err) {
            console.error("Error saving progress: ", err);
            alert('Failed to reset progress.');
        }
    };
    resetProgress();

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