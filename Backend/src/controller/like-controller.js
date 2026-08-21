import { prisma } from "../db.js";

const like = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

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

    const existingLike = await prisma.like.findUnique({
      where: {
        postId_userId: {
          userId,
          postId,
        },
      },
    });

    if (existingLike) {
      return res.status(400).json({
        message: "You have already liked this post",
      });
    }

    await prisma.like.create({
      data: {
        userId,
        postId,
      },
    });

    return res.status(201).json({
      message: "Post liked successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const unlike = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const existingLike = await prisma.like.findUnique({
      where: {
        postId_userId: {
          userId,
          postId,
        },
      },
    });

    if (!existingLike) {
      return res.status(404).json({
        message: "You have not liked this post yet",
      });
    }

    await prisma.like.delete({
      where: {
        postId_userId: {
          userId,
          postId,
        },
      },
    });

    return res.status(200).json({
      message: "Post unliked successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { like, unlike };
