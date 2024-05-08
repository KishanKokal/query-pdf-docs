const Chat = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="h-5/6 w-5/6 border-2 border-sky-500 flex flex-col justify-around items-center rounded-3xl p-5 gap-5">
        <div className="h-5/6 w-full border-2 border-sky-500 rounded-3xl flex flex-col p-5 overflow-y-scroll gap-5 scrollbar scrollbar-thumb-rose-500"></div>
        <div className="h-1/6 w-full"></div>
      </div>
    </div>
  );
};

export default Chat;
