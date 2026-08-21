import { prisma } from "../db.js";

const avatarImage = async (req, res) => {
  try {
    const { id } = req.user;
    const avatar = req.file;

    console.log(req.file); // Log the uploaded file information

    if (!avatar) {
      return res.status(400).json({ message: "Image is required" });
    }

    const avatarImg = await prisma.avatar.create({
      data: {
        avatar: req.file?.path || null,
        ownerId: id,
      },
    });

    res.status(201).json({ status: "Succes", avatarImage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteAvatar = async (req, res) => {
  try {
    const userId = req.user.id;
    const { avatarId } = req.params;

    const avatar = await prisma.avatar.delete({
      where: {
        id: avatarId,
        ownerId: userId,
      },
    });

    res.status(200).json({ message: "Avatar deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { avatarImage, deleteAvatar };
