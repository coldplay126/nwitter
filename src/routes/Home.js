import { db, docRef } from "fb";
import { useState } from "react";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await docRef(db, "nweets", { nweet, CreatedAt: Date.now() });
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
        <input type="submit" value="Nweet" />
        {error}
      </form>
    </div>
  );
};

export default Home;
