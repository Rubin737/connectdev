import { User } from "../../models/User.js";
import { upsertUserStream } from "../../lib/stream.js";
import { onboardValidation } from "../../utils/onboardValidation.js";

export const onboard = async (req, res) => {
  
  
  const userId = req.user._id;

 
  try {
    onboardValidation(req);
    const updateUser = await User.findByIdAndUpdate(
      { _id: userId },
      {
        ...req.body,
        isOnboarded: true,
      },
      { new: true, runValidators: true }
    );
    await updateUser.save();

    await upsertUserStream({
      id: updateUser._id.toString(),
      name: updateUser.fullName,
      image: updateUser.profilePic,
    });

    res
      .status(201)
      .json({
        message: "Onboard details entered successfully",
        data: updateUser,
        success: true,
      });
  } catch (err) {
    res.status(400).json({
      message:"validation failed",
      valErrors : err.valErrors
    })
  }
};
