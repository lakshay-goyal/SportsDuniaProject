import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  useUser,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import Dashboard from "./pages/Dashboard";
import News from "./pages/News";
import ArticleDetails from "./pages/ArticleDetails";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Payout from "./pages/Payout";
import NavBar from "./components/NavBar";
import WelcomePage from "./pages/WelcomePage";

function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return children;
}

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route
            path="/home"
            element={
              <>
                <SignedIn>
                  <Navigate to="/dashboard" replace />
                </SignedIn>
                <SignedOut>
                  <Home />
                </SignedOut>
              </>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/news"
            element={
              <ProtectedRoute>
                <News />
              </ProtectedRoute>
            }
          />

          <Route
            path="/payout"
            element={
              <ProtectedRoute>
                <Payout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/article/:id"
            element={
              <ProtectedRoute>
                <ArticleDetails />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
