import { Connection } from "../../models/Connection.js";
import { User } from "../../models/User.js";

export const myConnections = async (req, res) => {
  const loggedUserId = req.user._id;

  const user = await User.findById(loggedUserId).select("friends").populate("fullName location")
  console.log(`logginedUser: ${user}`);

  try {
    const connections = await Connection.find({
      $or: [
        {
          sender: loggedUserId,
          status: "accept",
        },
        {
          receipient: loggedUserId,
          status: "accept",
        },
      ],
    })
      .populate("sender", "fullName bio")
      .populate("receipient", "fullName bio");

    const onlyConnections = connections.map((connection) => {
      if (connection.sender._id.toString() === loggedUserId.toString()) {
        return connection.receipient;
      }
      return connection.sender;
    });

    res.status(200).json({
      success: true,
      message: "Your connections",
      data: onlyConnections,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      message: `Internal error:${err.message}`,
    });
  }
};
