import { useState } from "react";

import {
  db,
  deleteNweet,
  updateNweet,
} from "fb";

const Nweet = ({
  nweetObj,
  isOwner,
}) => {
  const [edit, setEdit] =
    useState(false);
  const [newNweet, setNewNweet] =
    useState(nweetObj.text);

  const onSubmit = (event) => {
    event.preventDefault();
    updateNweet(
      db,
      "nweets",
      nweetObj.id,
      { text: newNweet },
    );
    setEdit(false);
  };

  const onDelete = () => {
    const ok = window.confirm(
      "이 트윗을 삭제하시겠습니까?",
    );
    if (ok)
      deleteNweet(
        db,
        "nweets",
        nweetObj.id,
      );
  };

  const onEdit = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };

  const toggleEdit = () =>
    setEdit((prev) => !prev);

  const onClickHandler = async (
    event,
  ) => {
    const {
      target: { name },
    } = event;

    if (name === "delete")
      await onDelete();
    else toggleEdit();
  };

  return (
    <div>
      {edit ? (
        <>
          <form
            onSubmit={onSubmit}
          >
            <input
              type="text"
              placeholder="내용을 수정하세요"
              onChange={onEdit}
              value={newNweet}
              required
            />
            <input
              type="submit"
              value="트윕 업데이트"
            />
          </form>
          <button
            onClick={
              onClickHandler
            }
          >
            취소
          </button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <>
              <button
                name="edit"
                onClick={
                  onClickHandler
                }
              >
                수정
              </button>
              <button
                name="delete"
                onClick={
                  onClickHandler
                }
              >
                삭제
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
