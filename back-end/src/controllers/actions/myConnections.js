import { Connection } from "../../models/Connection.js";
import { User } from "../../models/User.js";

export const myConnections = async (req, res) => {
  
  const loggedUserId = req.user._id;

  const pageNumber = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;
  const skip = (pageNumber - 1) * limit;

  
  try {
    
    await User.findById(loggedUserId).select("friends").populate("fullName location");
    
    const connectionLogic = {
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
    };

    const connections = await Connection.find(connectionLogic)
      .populate(
        "sender",
        "fullName bio location nativeLanguage learningLanguage profilePic"
      )
      .populate(
        "receipient",
        "fullName bio location nativeLanguage learningLanguage profilePic"
      ).skip(skip).limit(limit).sort({updatedAt:-1})

    const onlyConnections = connections.map((connection) => {
      if (connection.sender._id.toString() === loggedUserId.toString()) {
        return connection.receipient;
      }
      return connection.sender;
    });

    const totalConnections = await Connection.countDocuments(connectionLogic)


    res.status(200).json({
      success: true,
      message: "Your connections",
      data: onlyConnections,
      pagination: {
        total: totalConnections,
        limit,
        page: pageNumber,
        hasMore: totalConnections > skip + onlyConnections.length,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Internal error:${err.message}`,
    });
  }
};
