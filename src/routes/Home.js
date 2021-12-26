import { Factory } from "components/Factory";
import Nweet from "components/Nweet";
import { orderByCurry, snapFunction } from "fb";
import { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    //refer to fb.js
    snapFunction(
      "nweets",
      (doc) => {
        const nweetArr = doc.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNweets(nweetArr);
      },
      orderByCurry("CreatedAt", "desc"),
    );
  }, []);

  return (
    <div>
      <Factory userObj={userObj}></Factory>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            isOwner={nweet.creatorId === userObj.uid}
            nweetObj={nweet}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
