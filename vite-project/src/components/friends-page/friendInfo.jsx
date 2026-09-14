import PeopleYouMK from "./peopleYouMk.jsx";

function FriendInfo() {
  return (
    <div className="mx-auto mt-8 mb-4 h-[65vh] w-[80vw] overflow-y-scroll rounded-2xl border border-white/10 bg-black/25 px-6 py-5 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-md scrollbar-none sm:block sm:w-[80vw] md:w-[70vw] lg:h-[90vh] lg:w-[50vw]">
      <h1 className="sticky top-0 z-50 mb-3 bg-[#08090e]/80 pb-2 text-xl font-semibold tracking-tight text-white backdrop-blur-md lg:text-2xl">
        People you may know
      </h1>
      <input
        type="search"
        placeholder="Find a friend"
        className="sticky top-11 z-50 my-4 h-11 w-full rounded-xl border border-white/10 bg-black/55 px-4 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-amber-300/60 focus:ring-2 focus:ring-amber-300/10 lg:mx-auto lg:block lg:w-[400px]"
      />
      <main className=" lg:w-[75%] lg:block lg:mx-auto">
        <PeopleYouMK />
      </main>
    </div>
  );
}

export default FriendInfo;
