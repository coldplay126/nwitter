import { auth, profile } from "fb";
import { useState } from "react";
import { useNavigate } from "react-router";

const Profile = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] =
    useState(userObj.displayName);
  const navigate = useNavigate();

  const signout = async () =>
    await auth.signOut();

  const OnLogoutClick = () => {
    signout().then(() => navigate("/"));
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await profile(userObj, {
        displayName: newDisplayName,
      });
      await refreshUser();
      console.log(userObj);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display Name"
          value={newDisplayName}
          onChange={onChange}
        />
        <input
          type="submit"
          value="update Profile"
        />
      </form>
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
