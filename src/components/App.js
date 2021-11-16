import { useState } from "react";
import AppRouter from "components/Router";

function App() {
  const [isLogIn, setIslogIn] = useState(false);

  return (
    <>
      <AppRouter isLogIn={isLogIn} />
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
