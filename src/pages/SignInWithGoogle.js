import React, { useState } from "react";
import { auth, googleAuthProvider } from "../lib/firebase";

const SignInWithGoogle = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      // Sign in with Google using Firebase
      const result = await auth.signInWithPopup(googleAuthProvider);
      const user = result.user;
      console.log("Signed in as:", user.displayName);
      // Optionally, store user data or redirect here
    } catch (err) {
      setError("Error signing in: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleSignIn} disabled={loading}>
        {loading ? "Signing in..." : "Sign in with Google"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SignInWithGoogle;
