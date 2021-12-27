import { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { auth, authState, profile } from "fb";
import { subscribe } from "routes/Home";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [changeName, setChangeName] = useState(false);

  useEffect(
    () =>
      authState(auth, async (user) => {
        if (user) {
          user.displayName === null
            ? await profile(user, {
                displayName: user.providerData[0].email,
              })
            : await setUserObj(user);
          await setUserObj(user);
        } else {
          setUserObj(null);
        }
        setInit(true);
      }),
    [],
  );

  const islogIn = Boolean(userObj);

  function refreshUser() {
    return setChangeName((prev) => !prev);
  }

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLogIn={islogIn}
          userObj={userObj}
        />
      ) : (
        "Loading..."
      )}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
