import { auth } from "fb";
import { useNavigate } from "react-router";

const Profile = () => {
  const navigate = useNavigate();
  const signout = async () =>
    await auth.signOut();
  const redirect = (a) =>
    navigate(a);

  const onLogoutClick = () => {
    signout().then(redirect("/"));
  };

  return (
    <>
      <button
        name="LogOut"
        onClick={onLogoutClick}
      >
        Log Out
      </button>
    </>
  );
};

export default Profile;
