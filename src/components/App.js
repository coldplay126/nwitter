import { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { auth, authState, profile } from "fb";
import _ from "lodash";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [name, setName] = useState("");

  useEffect(
    () =>
      authState(auth, async (user) => {
        if (user) {
          user.displayName
            ? await setUserObj(user)
            : await profile(user, {
                displayName: user.email,
              });
          await setUserObj(user);
        } else setUserObj(null);
        setInit(true);
      }),
    [],
  );

  const islogIn = Boolean(userObj);

  const refreshUser = async () => {
    const user = auth.currentUser;
    setName(user.displayName);
  };

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
      <footer>
        &copy; {new Date().getFullYear()} Nwitter
      </footer>
    </>
  );
}

export default App;
