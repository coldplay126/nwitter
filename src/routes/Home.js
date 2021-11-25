import Nweet from "components/Nweet";
import { v4 as uuidv4 } from "uuid";
import {
  db,
  docRef,
  downloadFile,
  snap,
  storage,
  storageRef,
  uploadFile,
} from "fb";
import {
  useEffect,
  useState,
  useRef,
} from "react";

const Home = ({ userObj }) => {
  const [nweet, setNweet] =
    useState("");
  const [nweets, setNweets] =
    useState([]);
  const [error, setError] =
    useState("");
  const [preview, setPreview] =
    useState("");
  const [upload, setUpload] =
    useState();

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
      const ref = storageRef(
        storage,
        `${
          userObj.uid
        }/${uuidv4()}`,
      );
      const metadata = {
        contentType: "image/jpeg",
      };

      const respone =
        await uploadFile(
          ref,
          upload,
          metadata,
        );

      console.log(
        "업로드",
        respone,
        respone.ref,
      );

      await downloadFile(
        respone.ref,
      ).then((url) =>
        console.log(url),
      );

      // await docRef(db, "nweets", {
      //   text: nweet,
      //   CreatedAt: Date.now(),
      //   creatorId: userObj.uid,
      // });
      // setNweet("");
    } catch (err) {
      setError(err);
    }
  };

  const onRef = useRef("");

  const onImage = (e) => {
    const {
      target: { files },
    } = e;

    setUpload(files[0]);

    const url =
      window.URL.createObjectURL(
        files[0],
      );
    setPreview(url);
    window.onload = () =>
      window.URL.revokeObjectURL(
        url,
      );
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNweet(value);
  };

  const onAttachment = () => {
    setPreview(null);
    onRef.current.value = null;
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
          type="file"
          accept="image/*"
          onChange={onImage}
          ref={onRef}
        />
        <input
          type="submit"
          value="Nweet"
        />
        {preview && (
          <div>
            <img
              height="100px"
              src={preview}
              alt="thumbnail"
            />
            <button
              onClick={
                onAttachment
              }
            >
              clear
            </button>
          </div>
        )}
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
      <img />
    </div>
  );
};

export default Home;
