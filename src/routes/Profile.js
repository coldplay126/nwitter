import { auth, snap } from "fb";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const Profile = ({ userObj }) => {
  const navigate = useNavigate();

  const signout = async () =>
    await auth.signOut();

  const OnLogoutClick = () => {
    signout().then(() => navigate("/"));
  };

  const getmyNweets = async () => {
    const nweets = snap("nweets");
  };

  useEffect(() => {
    getmyNweets();
  }, []);

  return (
    <>
      <button
        name="LogOut"
        onClick={OnLogoutClick}
      >
        Log Out
      </button>
    </>
  );
};

export default Profile;
