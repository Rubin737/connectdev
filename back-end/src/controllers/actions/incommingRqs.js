import { Connection } from "../../models/Connection.js";

export const inncommingReqs = async (req, res) => {
  const loggedUserId = req.user._id;

  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 7 
  const skip = (page-1) * limit

  const inLogic = {
    receipient: loggedUserId,
    status: "interest",
  };
  const acceptLogic = {
    receipient: loggedUserId,
    status: "accept",
  };

  try {
    const [commingReqs, acceptedReqs,incommingCount,acceptCount] = await Promise.all([
      
      Connection.find(inLogic).populate(
        "sender",
        "fullName nativeLanguage learningLanguage profilePic _id"
      ).skip(skip).limit(limit),
      
      Connection.find(acceptLogic).populate(
        "sender",
        "fullName nativeLanguage learningLanguage profilePic _id"
      ).skip(skip).limit(10),

       Connection.countDocuments(inLogic),
       Connection.countDocuments(acceptLogic)

    ]);


    if (commingReqs.length === 0 && acceptedReqs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No connection requests",
      });
    }

    res.status(200).json({
      success: true,
      message: "Incomming request",
      data: { commingReqs, acceptedReqs },
      pagination: {
        page,
        limit,
        totalIncommingPages: Math.ceil(incommingCount / limit),
        totalAcceptPages: Math.ceil(acceptCount / limit),
        incommingHasMore: skip + commingReqs.length < incommingCount,
        acceptedHasMore: skip + acceptedReqs.length < acceptCount,
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: `Internal error : ${err.message}`,
    });
  }
};
