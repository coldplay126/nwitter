import { auth, createUser, signIn } from "fb";
import { useState } from "react";

const Auth = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChanage = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      if (newAccount) {
        const data = await createUser(auth, form.email, form.password);
      } else {
        const data = await signIn(auth, form.email, form.password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

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
          value={newAccount ? "Create Account" : "Sign In"}
        />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>
      <div>
        <button>Contiune with Google</button>
        <button>Contiune with GitHub</button>
      </div>
    </div>
  );
};

export default Auth;
