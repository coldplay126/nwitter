import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { docRef, downloadFile, storage, storageRef, uploadFile } from "fb";

export function Factory({ userObj }) {
  const [nweet, setNweet] = useState("");
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");
  const [upload, setUpload] = useState("");

  const onImage = (e) => {
    const {
      target: { files },
    } = e;

    setUpload(files[0]);

    const url = window.URL.createObjectURL(files[0]);
    setPreview(url);
    window.onload = () => window.URL.revokeObjectURL(url);
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNweet(value);
  };

  const onRef = useRef("");

  const onCancel = () => {
    setPreview(null);
    onRef.current.value = null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let fileUrl = "";
      if (upload !== "") {
        const ref = storageRef(storage, `${userObj.uid}/${uuidv4()}`);

        await uploadFile(ref, upload);

        fileUrl = await downloadFile(ref);
      }

      await docRef("nweets", {
        text: nweet,
        CreatedAt: Date.now(),
        creatorId: userObj.uid,
        fileUrl,
      });
      setNweet("");
      setUpload("");
      onCancel();
    } catch (err) {
      setError(err);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="What's on your mind?"
        maxLength={120}
        value={nweet}
        onChange={onChange}
      />
      <input type="file" accept="image/*" onChange={onImage} ref={onRef} />
      <input type="submit" value="Nweet" />
      {preview && (
        <div>
          <img height="100px" src={preview} alt="thumbnail" />
          <button onClick={onCancel}>취소</button>
        </div>
      )}
      {error}
    </form>
  );
}
