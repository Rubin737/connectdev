import { Connection } from "../../models/Connection.js";
import { User } from "../../models/User.js";

export const reviewRequest = async (req, res) => {
  
  const receipienId = req.user._id;
  const { status, id: connectionId } = req.params;
  const isOnboarded = req.user.isOnboarded;
  const allowedStatuses = ["accept", "reject"];

  try {

    if (!isOnboarded) {
      return res
        .status(400)
        .json({ success: false, message: "You need to onboard first" });
    }
  
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid request type : ${status}`,
      });
    }

    const findConnection = await Connection.findOne({
      _id: connectionId,
      receipient: receipienId,
      status: "interest",
    }).populate("sender receipient", "fullName");

    

    if (!findConnection) {
      return res
        .status(400)
        .json({ success: false, message: "Request is not exists" });
    }

  

    findConnection.status = status;
    await findConnection.save();

    const saveFriendsOnSender = await User.findByIdAndUpdate(
      findConnection.sender,{$addToSet:{friends:findConnection.receipient}}
    )
    const saveFriendsOnRecipient = await User.findByIdAndUpdate(
      findConnection.sender,{$addToSet:{friends:findConnection.sender}}
    )


    res.status(200).json({
      success: true,
      data: findConnection,
      message:
        status === "accept" ? "request is accepted" : "request is rejected",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: `Internal Error:${err.message}` });
  }
};
