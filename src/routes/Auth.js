import {
  auth,
  createUser,
  signIn,
  githubProvider,
  googleProvider,
  popUp,
} from "fb";
import { useState } from "react";

const Auth = () => {
  const [form, setForm] = useState(
    {
      email: "",
      password: "",
    },
  );
  const [
    newAccount,
    setNewAccount,
  ] = useState(true);
  const [error, setError] =
    useState("");

  const onChanage = (e) => {
    const {
      target: { name, value },
    } = e;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = async (
    event,
  ) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await createUser(
          form.email,
          form.password,
        );
      } else {
        data = await signIn(
          auth,
          form.email,
          form.password,
        );
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleAccount = () =>
    setNewAccount((prev) => !prev);

  const socialClick = async (
    e,
  ) => {
    const {
      target: { name },
    } = e;

    try {
      if (name === "google") {
        await popUp(
          auth,
          googleProvider,
        );
      } else if (
        name === "github"
      ) {
        await popUp(
          auth,
          githubProvider,
        );
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={onChanage}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={onChanage}
        />
        <input
          type="submit"
          value={
            newAccount
              ? "Create Account"
              : "Sign In"
          }
        />
        {error}
      </form>
      <span
        onClick={toggleAccount}
      >
        {newAccount
          ? "Sign In"
          : "Create Account"}
      </span>
      <div>
        <button
          name="google"
          onClick={socialClick}
        >
          Contiune with Google
        </button>
        <button
          name="github"
          onClick={socialClick}
        >
          Contiune with GitHub
        </button>
      </div>
    </div>
  );
};

export default Auth;
