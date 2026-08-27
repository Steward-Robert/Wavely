import BMenu from "../components/bottomMenu.jsx";
import Foryou from "../components/foryou.jsx";
import Header from "../components/header.jsx";
import LSidebar from "../components/sidebar/leftSidbar.jsx";
import ShareSM from "../components/shareSM.jsx";
import Stories from "../components/strories.jsx";
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
