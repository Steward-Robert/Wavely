function FriendMenu({ setActiveMenu }) {
  return (
    <div className="mt-5">
      <p className="ml-6 text-2xl text-white mb-8 underline underline-offset-8 lg:fixed lg:right-7.5 lg:top-25">
        Connect with others
      </p>

      <div className="border border-white/20 rounded-2xl flex block mx-auto items-center justify-center w-[350px] bg-black/30 lg:fixed lg:right-1 lg:w-[270px] lg:py-3 lg:top-40 lg:bg-transparent lg:border-none">
        <div className="flex flex-col gap-2 text-[18px] my-2.5">
          <button
            onClick={() => setActiveMenu("received")}
            className="border-white/0 md:flex md:gap-1 border-2 hover:border-l-amber-300 hover:border-b-amber-300 rounded-[10px] pl-3 hover:bg-white/10 h-13 items-center cursor-pointer duration-500 text-white"
          >
            Friend request
          </button>

          <button
            onClick={() => setActiveMenu("sent")}
            className="border-white/0 md:flex md:gap-1 border-2 hover:border-l-amber-300 hover:border-b-amber-300 rounded-[10px] pl-3 hover:bg-white/10 h-13 items-center cursor-pointer duration-500 text-white"
          >
            Sent request
          </button>

          <button
            onClick={() => setActiveMenu("friends")}
            className="border-white/0 md:flex md:gap-1 border-2 hover:border-l-amber-300 hover:border-b-amber-300 rounded-[10px] pl-3 hover:bg-white/10 h-13 items-center cursor-pointer duration-500 text-white"
          >
            My friends
          </button>

          <button
            onClick={() => setActiveMenu("people")}
            className="border-white/0 md:flex md:gap-1 border-2 hover:border-l-amber-300 hover:border-b-amber-300 rounded-[10px] pl-3 hover:bg-white/10 h-13 items-center cursor-pointer duration-500 text-white"
          >
            People you may know
          </button>
        </div>
      </div>
    </div>
  );
}

export default FriendMenu;
