import Header from "../components/header";
import BMenu from "../components/feeds/bottomMenu";
import PostHeader from "../components/post-page/createPost";
import LSidebar from "../components/sidebar/leftSidbar";

function Post() {
  return (
    <div className="min-h-screen">
      <Header />
      <LSidebar />
      <PostHeader />
      <BMenu />
    </div>
  );
}

export default Post;
