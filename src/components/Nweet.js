const Nweet = ({
  nweetObj,
  isOwner,
}) => {
  return (
    <div>
      <h4>{nweetObj.text}</h4>
      {isOwner && (
        <>
          <button>수정</button>
          <button>삭제</button>
        </>
      )}
    </div>
  );
};

export default Nweet;
