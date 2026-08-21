import { title } from "process";
import { prisma } from "../db.js";

const post = async (req, res) => {
  try {
    const { content } = req.body;
    const image = req.file;
    const { id } = req.user;

    console.log(req.file); // Log the uploaded file information
    console.log(req.body); // Log the request body

    if (!image || !content) {
      return res
        .status(400)
        .json({ message: "Image and content are required" });
    }
    const newPost = await prisma.post.create({
      data: {
        content,
        image: req.file?.path || null,
        authorId: id,
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const deletePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId } = req.params;

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (post.authorId !== userId) {
      return res.status(403).json({
        message: "You cannot delete this post",
      });
    }

    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;
    const { postId } = req.params;

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.authorId !== userId) {
      return res.status(400).json({ message: "You cannot modify this post" });
    }

    const newPost = await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        content,
      },
    });

    res.status(200).json({
      status: "succes",
      message: "Post updated succesfully",
      data: {
        newPost,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const allPost = async (req, res) => {
  try {
    const post = await prisma.post.findMany();
    res.status(200).json({
      status: "Succes",
      post,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export { post, deletePost, updatePost, allPost };
