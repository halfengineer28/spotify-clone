import { User } from "../models/user.models.js";

export const authCallback = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;
    const user = await User.findOne({ clerkId: id });
    if (!user) {
      await User.create({
        fullName: `${firstName || ""} ${lastName || ""}`.trim(),
        imageUrl : imageUrl,
        clerkId:id
      });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.log("Error in auth callback", error);
    next(error);
  }
};