import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import NotFound from "./views/NotFound";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Profile from "./views/Profile";
import About from "./views/About";
import Header from "./components/Header";
import PublicRoutes from "./routes/PublicRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import CreateListing from "./views/Listing";
import AllListings from "./views/Listing/components/allListings";
import ViewListing from "./views/Listing/components/viewListing";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/signup"
          element={
            <PublicRoutes>
              <SignUp />
            </PublicRoutes>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/create-listing"
          element={
            <ProtectedRoutes>
              <CreateListing />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/listings"
          element={
            <ProtectedRoutes>
              <AllListings />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/listing/:id"
          element={
            <ProtectedRoutes>
              <ViewListing />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/listings/:id"
          element={
            <ProtectedRoutes>
              <CreateListing />
            </ProtectedRoutes>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
