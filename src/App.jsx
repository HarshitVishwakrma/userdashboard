// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import MainLayout from "./Layouts/MainLayout";
import Leaderboard from "./pages/LeaderBoard";
import { AuthProvider } from "../context/AuthContext";

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        {/* Public Routes: Login and Register */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/home" element={<Home />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Route>
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
