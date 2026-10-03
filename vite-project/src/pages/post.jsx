import Header from "../components/header";
import PostHeader from "../components/post-page/postHeader";
import LSidebar from "../components/sidebar/leftSidbar";

function Post({ user }) {
  return (
    <div className="min-h-screen">
      <Header />
      <LSidebar />
      <PostHeader user={user} />
    </div>
  );
}

export default Post;
