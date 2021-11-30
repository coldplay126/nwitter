import { auth, querySnapShot } from "fb";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Profile = ({ userObj }) => {
  const [newDisplayName, setNewDisplayName] =
    useState(userObj.displayName);
  const navigate = useNavigate();

  const signout = async () =>
    await auth.signOut();

  const OnLogoutClick = () => {
    signout().then(() => navigate("/"));
  };

  // const getmyNweets = async () => {
  //   const nweets = await querySnapShot(
  //     "nweets",
  //   ).then((doc) =>
  //     console.log(doc.docs.map((a) => a.data())),
  //   );
  // };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
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
