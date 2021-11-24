import {
  useState,
  useEffect,
} from "react";
import AppRouter from "components/Router";
import {
  auth,
  authState,
} from "fb";

function App() {
  const [init, setInit] =
    useState(false);
  const [isLogIn, setIslogIn] =
    useState(false);
  const [userObj, setUserObj] =
    useState(null);

  useEffect(() => {
    //effect;
    return authState(
      auth,
      (user) => {
        if (user) {
          setIslogIn(true);
          setUserObj(user);
        } else setIslogIn(false);

        setInit(true);
      },
    );
  }, []);

  return (
    <>
      {init ? (
        <AppRouter
          isLogIn={isLogIn}
          userObj={userObj}
        />
      ) : (
        "Loading..."
      )}
      <footer>
        &copy;{" "}
        {new Date().getFullYear()}{" "}
        Nwitter
      </footer>
    </>
  );
}

export default App;
