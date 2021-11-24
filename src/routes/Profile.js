import { auth } from "fb";
import { useNavigate } from "react-router";

const Profile = () => {
  const navigate = useNavigate();

  const signout = async () =>
    await auth.signOut();

  const OnLogoutClick = () => {
    signout().then((_) =>
      navigate("/"),
    );
  };

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
