/**
 * December 3rd, 2025
 * HCDE 438 Final Project
 * 
 * This web application is an interactive choose-your-own-adventure game called A Cat's Journey. 
 * Fetches data from the Quote Ninja API. Renders React components including a navigation bar, home page, log in page, 
 * register page, and game page. 
 *
 * @summary An interactive web app choose-your-own-adventure game called A Cat's Journey.
 * @author Darby Moore
 */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Navbar from "./components/NavBar/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
// import Profile from "./pages/Profile/Profile";
import "./App.css";
import Questions from "./pages/Questions/Questions";
import Gameover from "./pages/Game Over/GameOver";
import { FishCountProvider } from './context/FishCountContext';

// Returns the app React components and all routes, including an authentication provider. 
function App() {
  return (
    <AuthProvider>
      <Router>
        <FishCountProvider>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route 
                  path="/questions" 
                  element={
                    <ProtectedRoute>
                      <Questions />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/gameover" element={<Gameover />} />
              </Routes>
            </main>
          </div>
        </FishCountProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;