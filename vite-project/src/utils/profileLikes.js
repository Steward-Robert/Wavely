import axios from "axios";

const API_URL = "https://wavely-backend-7ryc.onrender.com/api";

const fetchLikesReceived = async (userId, signal) => {
  const response = await axios.get(`${API_URL}/post`, {
    withCredentials: true,
    signal,
  });
  const posts = response.data?.posts;

  if (!Array.isArray(posts)) {
    throw new Error("The server did not return a posts list.");
  }

  return posts.reduce((total, post) => {
    if (post.authorId !== userId) return total;
    if (!Number.isInteger(post._count?.likes) || post._count.likes < 0) {
      throw new Error("The server did not return a post like count.");
    }
    return total + post._count.likes;
  }, 0);
};

export default fetchLikesReceived;
