import Header from "../components/header";
import BMenu from "../components/feeds/bottomMenu";
import PostHeader from "../components/post-page/postHeader";
import LSidebar from "../components/sidebar/leftSidbar";

function Post({ user }) {
  return (
    <div className="min-h-screen">
      <Header />
      <LSidebar />
      <PostHeader user={user} />
      <BMenu />
    </div>
  );
}

export default Post;
