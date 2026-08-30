import BMenu from "../components/feeds/bottomMenu";
import Header from "../components/header";
import FriendMenu from "../components/friends-page/friendMenu";
import FriendInfo from "../components/friends-page/friendInfo.jsx";
import { useState } from "react";
import LSidebar from "../components/sidebar/leftSidbar.jsx";
import SentRequest from "../components/friends-page/sentRequest.jsx";

import MyFriends from "../components/friends-page/myFriends.jsx";
import FriendREQ from "../components/friends-page/friendREQ.jsx";

function FriendsPage() {
  const [activeMenu, setActiveMenu] = useState("people");

  return (
    <>
      <Header />
      <LSidebar />

      <FriendMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      {activeMenu === "people" && <FriendInfo />}
      {activeMenu === "sent" && <SentRequest />}
      {activeMenu == "friends" && <MyFriends />}
      {activeMenu == "received" && <FriendREQ />}

      <BMenu />
    </>
  );
}

export default FriendsPage;
