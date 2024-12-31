import React, { useState } from "react";
import { auth } from './FirebaseConfig'; // Correct import path
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(false); // Track if it's login or signup
  const navigate = useNavigate(); // For redirecting

  // Handle email and password authentication (Login or Signup)
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      // Login with email and password
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("User logged in:", userCredential.user);
          navigate("/"); // Redirect to home page
        })
        .catch((error) => {
          console.error("Error logging in:", error.message);
          setError(error.message);
        });
    } else {
      // Signup with email and password
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("User signed up:", userCredential.user);
          navigate("/"); // Redirect to home page
        })
        .catch((error) => {
          console.error("Error signing up:", error.message);
          setError(error.message);
        });
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google login successful:", user);
      navigate("/"); // Redirect to home page
    } catch (error) {
      console.error("Google login error:", error);
      setError("Google login failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleAuth} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">{isLogin ? "Log In" : "Sign Up"}</h2>
        {error && <p className="text-sm text-red-400 animate-pulse">{error}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700"
        >
          {isLogin ? "Log In" : "Sign Up"}
        </button>
        <div className="mt-4">
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full flex justify-center items-center bg-gray-700 text-white py-2 rounded hover:bg-gray-800"
          >
            Sign Up / Log In with Google
          </button>
        </div>
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            type="button"
            className="text-teal-600 hover:text-teal-800"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
