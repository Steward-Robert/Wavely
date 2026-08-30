import PeopleYouMK from "./peopleYouMk.jsx";

function FriendInfo() {
  return (
    <div className="w-[80vw] border border-white/20 rounded-2xl mx-auto mt-10 h-[65vh] mb-4 bg-black/20 overflow-y-scroll scrollbar-none px-9 py-4 backdrop-blur-sm md:w-[70vw]  sm:w-[80vw] sm:block md:block lg:w-[50vw] lg:h-[90vh] ">
      <h1 className="text-white/50 mb-2.5 text-xl underline underline-offset-7 sticky z-50 top-0 lg:text-2xl lg:block ">
        People you may know
      </h1>
      <input
        type="search"
        placeholder="Find a friend"
        className=" px-6 border-b border-gray-600 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-orange-300  transition-colors my-5 sticky top-10 z-50 rounded-[10px] h-[50px] backdrop-blur-[20px] bg-black/50 w-[40vw] lg:w-[400px] lg:block lg:mx-auto"
      />
      <main className=" lg:w-[75%] lg:block lg:mx-auto">
        <PeopleYouMK />
      </main>
    </div>
  );
}

export default FriendInfo;
