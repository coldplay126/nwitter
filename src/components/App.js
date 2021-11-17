import { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { auth, authState } from "fb";

function App() {
  const [init, setInit] = useState(false);
  const [isLogIn, setIslogIn] = useState(false);

  useEffect(() => {
    //effect;
    return authState(auth, (user) => {
      if (user) setIslogIn(true);
      else setIslogIn(false);

      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? <AppRouter isLogIn={isLogIn} /> : "Loading..."}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
