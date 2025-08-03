import { Connection } from "../../models/Connection.js";
import { User } from "../../models/User.js";

export const sendRequest = async (req, res) => {
  const senderId = req.user._id;
  const receipientId = req.params.id;
  const status = req.params.status;
  const isOnboarded = req.user.isOnboarded;

  if(!isOnboarded){
    return res
      .status(400)
      .json({ success: false, message: "You need to onboard first" }); 
  }


  const allowedStatuses = ["interest", "ignore"];

  try {
    if (!allowedStatuses.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request type" });
    }

    if (senderId.equals(receipientId)) {
      return res
        .status(400)
        .json({ success: false, message: "You cant send request to urself" });
    }


    const receipient = await User.findOne({ _id: receipientId });
    if (!receipient) {
      return res
        .status(404)
        .json({ success: false, message: "User doesn't exists" });
    }

    const existingConnection = await Connection.findOne({
      $or: [
        {
          sender: senderId,
          receipient: receipientId,
        },
        {
          sender: receipientId,
          receipient: senderId,
        },
      ],
    });

    if (existingConnection) {
      return res.status(400).send("Conection already exists");
    }

    const newConnection = await Connection.create({
      sender: senderId,
      receipient: receipientId,
      status: status,
    });

    await newConnection
      .populate("sender receipient", "fullName")

    return res.status(201).json({
      success: true,
      message:
        status === "interest"
          ? "request send successfully"
          : "ignored successfully",
      data: newConnection,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ 
      success: false,
      message: `Internal error : ${err.message}`,
    });
  }
};
