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
                {/* <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                /> */}
              </Routes>
            </main>
          </div>
        </FishCountProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;