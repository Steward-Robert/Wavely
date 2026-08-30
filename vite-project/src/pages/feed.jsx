import BMenu from "../components/feeds/bottomMenu.jsx";
import Foryou from "../components/feeds/foryou.jsx";
import Header from "../components/header.jsx";
import LSidebar from "../components/sidebar/leftSidbar.jsx";
import ShareSM from "../components/feeds/shareSM.jsx";
import Stories from "../components/feeds/strories.jsx";
import RSidebar from "../components/sidebar/rightSidebar.jsx";

function Feed() {
  return (
    <>
      <Header />
      <RSidebar />
      <LSidebar />
      <Stories />
      <ShareSM />
      <Foryou />
      <BMenu />
    </>
  );
}

export default Feed;
