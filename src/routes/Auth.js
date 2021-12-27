import { AuthForm } from "components/AuthForm";
import { auth, githubProvider, googleProvider, popUp } from "fb";
import { useState } from "react";

const Auth = () => {
  const [error, setError] = useState("");

  const socialClick = async (e) => {
    const {
      target: { name },
    } = e;

    try {
      if (name === "google") {
        await popUp(auth, googleProvider);
      } else if (name === "github") {
        await popUp(auth, githubProvider);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <AuthForm></AuthForm>
      <div>
        <button name="google" onClick={socialClick}>
          Contiune with Google
        </button>
        <button name="github" onClick={socialClick}>
          Contiune with GitHub
        </button>
        {error}
      </div>
    </div>
  );
};

export default Auth;
