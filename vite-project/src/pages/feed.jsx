import Foryou from "../components/feeds/foryou.jsx";
import Header from "../components/header.jsx";
import LSidebar from "../components/sidebar/leftSidbar.jsx";
import ShareSM from "../components/feeds/shareSM.jsx";
import Stories from "../components/feeds/strories.jsx";
import RSidebar from "../components/sidebar/rightSidebar.jsx";

function Feed({ user, alluser }) {
  return (
    <>
      <Header user={user} />
      <RSidebar alluser={alluser} />
      <LSidebar />
      <Stories />
      <ShareSM user={user} />
      <div className="mx-auto my-7 w-[80vw] lg:w-[45vw]">
        <div aria-hidden="true" className="flex flex-col gap-2">
          <span className="h-px w-full bg-gradient-to-r from-white/20 to-transparent" />
          <span className="h-px w-3/4 bg-gradient-to-r from-white/15 to-transparent" />
          <span className="h-px w-1/2 bg-gradient-to-r from-white/10 to-transparent" />
        </div>
      </div>
      <div className="pb-28 md:pb-0">
        <Foryou />
      </div>
    </>
  );
}

export default Feed;
