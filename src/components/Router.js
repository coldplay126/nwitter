import { Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const AppRouter = ({ isLogIn, auth }) => {
  return (
    <Routes>
      {isLogIn ? (
        <>
          <Route exact path="/" element={<Home />} />
        </>
      ) : (
        <Route exact path="/" element={<Auth auth={auth} />} />
      )}
    </Routes>
  );
};

export default AppRouter;
