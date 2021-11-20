import Nweet from "components/Nweet";
import {
  db,
  docRef,
  snap,
} from "fb";
import {
  useEffect,
  useState,
} from "react";

const Home = ({ userObj }) => {
  const [nweet, setNweet] =
    useState("");
  const [nweets, setNweets] =
    useState([]);
  const [error, setError] =
    useState("");

  // old one
  // const getQuery = async () => {
  //   const dbNweets = await querySnapShot(db, "nweets");

  //   dbNweets.forEach((docs) => {
  //     const nweetObj = {
  //       ...docs.data(),
  //       id: docs.id,
  //     };

  //     setNweets((prev) => [nweetObj, ...prev]);
  //   });
  // };

  useEffect(() => {
    //refer to fb.js
    snap(
      db,
      "nweets",
      (doc) => {
        const nweetArr =
          doc.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

        setNweets(nweetArr);
      },
      "CreatedAt",
      "desc",
    );
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await docRef(db, "nweets", {
        text: nweet,
        CreatedAt: Date.now(),
        creatorId: userObj.uid,
      });
      setNweet("");
    } catch (err) {
      setError(err);
    }
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          value={nweet}
          onChange={onChange}
        />
        <input
          type="submit"
          value="Nweet"
        />
        {error}
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            isOwner={
              nweet.creatorId ===
              userObj.uid
            }
            nweetObj={nweet}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
