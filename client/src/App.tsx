import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import NotFound from "./views/NotFound";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Profile from "./views/Profile";
import About from "./views/About";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
