import MyF from "./myF.jsx";
import { useState } from "react";

function MyFriends({ setUserInfo }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <section className="mt-5 rounded-2xl border border-white/10 bg-[#05070b]/90 px-4 py-5 shadow-[0_18px_45px_rgba(0,0,0,0.45)] backdrop-blur-xl backdrop-saturate-150 sm:px-6 md:max-h-[calc(100dvh-16rem)] md:min-h-[240px] md:overflow-y-auto md:scrollbar-none lg:w-[60vw] lg:mx-auto">
      <h2 className="mb-4 text-xl font-semibold tracking-tight text-white sm:text-2xl">
        My friends
      </h2>
      <input
        type="search"
        aria-label="Search friends"
        placeholder="Find a friend"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        className="mb-4 h-11 w-full rounded-xl border border-white/15 bg-black/25 px-4 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none backdrop-blur-xl transition placeholder:text-slate-400 focus:border-amber-100/45 focus:ring-2 focus:ring-amber-100/10"
      />
      <div className="divide-y divide-white/8 lg:px-13 px-5">
        <MyF searchTerm={searchTerm} setUserInfo={setUserInfo} />
      </div>
    </section>
  );
}

export default MyFriends;
