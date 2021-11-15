import { useState } from "react";
import AppRouter from "components/Router";
import { auth } from "fb";

function App() {
  const [isLogIn, setIslogIn] = useState(auth.currentUser);

  return (
    <>
      <AppRouter isLogIn={isLogIn} />
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
