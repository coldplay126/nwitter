import { Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const AppRouter = ({ isLogIn, userObj }) => {
  return (
    <>
      <div>
        {isLogIn && (
          <Navigation userObj={userObj} />
        )}
      </div>
      <Routes>
        {isLogIn ? (
          <>
            <Route
              path="/"
              element={<Home userObj={userObj} />}
            />
            <Route
              path="/profile"
              element={
                <Profile userObj={userObj} />
              }
            />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </>
  );
};

export default AppRouter;
