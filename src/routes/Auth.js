import { auth, createUser, signIn } from "fb";
import { useState } from "react";

const Auth = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [newAccount, setNewAccount] = useState(true);

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
      console.log(err);
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
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
      </form>

      <button>Contiune with Google</button>
      <button>Contiune with GitHub</button>
    </div>
  );
};

export default Auth;
