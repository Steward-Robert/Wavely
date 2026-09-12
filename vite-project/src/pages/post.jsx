import Header from "../components/header";
import BMenu from "../components/feeds/bottomMenu";
import PostHeader from "../components/post-page/createPost";

function Post() {
  return (
    <div className="min-h-screen">
      <Header />
      <PostHeader />
      <BMenu />
    </div>
  );
}

export default Post;
