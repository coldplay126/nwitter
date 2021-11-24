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
  const [userObj, setUserObj] =
    useState(null);

  useEffect(
    () =>
      authState(auth, (user) => {
        if (user) setUserObj(user);
        else setUserObj(null);

        setInit(true);
      }),
    [],
  );

  const islogIn = Boolean(userObj);

  return (
    <>
      {init ? (
        <AppRouter
          isLogIn={islogIn}
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
