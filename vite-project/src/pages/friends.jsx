import BMenu from "../components/feeds/bottomMenu";
import Header from "../components/header";
import FriendMenu from "../components/friends-page/friendMenu";
import FriendInfo from "../components/friends-page/friendInfo.jsx";
import { useState } from "react";
import LSidebar from "../components/sidebar/leftSidbar.jsx";
import SentRequest from "../components/friends-page/sentRequest.jsx";

import MyFriends from "../components/friends-page/myFriends.jsx";
import FriendREQ from "../components/friends-page/friendREQ.jsx";

function FriendsPage({ allUser, setUserInfo }) {
  const [activeMenu, setActiveMenu] = useState("people");

  return (
    <>
      <Header />
      <LSidebar />
      <main className="min-h-screen px-4 pb-28 pt-24 sm:px-6 md:pl-24 lg:pl-64 lg:pr-10 lg:pt-28">
        <div className="mx-auto max-w-5xl">
          <FriendMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

          {activeMenu === "people" && <FriendInfo allUser={allUser} />}
          {activeMenu === "sent" && <SentRequest />}
          {activeMenu == "friends" && <MyFriends setUserInfo={setUserInfo} />}
          {activeMenu == "received" && <FriendREQ />}
        </div>
      </main>

      <BMenu />
    </>
  );
}

export default FriendsPage;
