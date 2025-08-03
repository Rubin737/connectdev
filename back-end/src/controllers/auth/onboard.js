import { User } from "../../models/User.js";
import { upsertUserStream } from "../../lib/stream.js";

export const onboard = async (req, res) => {
  const { fullName, location, nativeLanguage, learningLanguage, bio } =
    req.body;

  const userId = req.user._id;

  const bioWordLimit = 20;
  const bioWordCount = bio?.trim().split(/\s+/).length;

  try {
    if (
      !fullName ||
      !location ||
      !nativeLanguage ||
      !learningLanguage ||
      !bio ||
      bioWordCount > bioWordLimit
    ) {
      res.status(400).json({
        success: false,
        message: "All feilds are required",
        missingFeilds: [
          !fullName && "fullName is missing",
          !location && "location is missing",
          !nativeLanguage && "native language is missing",
          !learningLanguage && "learning language is missing",
          !bio && "bio is missing",
          bioWordCount > bioWordLimit &&
            `Bio should less than ${bioWordLimit} words `,
        ].filter(Boolean),
      });
    }

    const updateUser = await User.findByIdAndUpdate(
      { _id: userId },
      {
        ...req.body,
        isOnboarded: true,
      },
      { new: true, runValidators: true }
    );
    await updateUser.save()

    await upsertUserStream({
      id: updateUser._id.toString(),
      name: updateUser.fullName,
      image: updateUser.profilePic,
    });


    res.status(201).json({message:"Onboard details entered successfully",data:updateUser,success:true});
  } catch (err) {
    res.status(500).send(err.message);
  }
};
