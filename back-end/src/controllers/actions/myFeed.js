import { Connection } from "../../models/Connection.js";
import { User } from "../../models/User.js";

export const myFeed = async (req, res) => {
  const loggedUser = req.user;


  const pageNumber = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;
  const skip = (pageNumber - 1) * limit;

  try {
    const connection = await Connection.find({
      $or: [
        {
          sender: loggedUser._id,
        },
        {
          receipient: loggedUser._id,
        },
      ],
    });

    const feed = new Set();

    connection.forEach((people) => {
      feed.add(people.sender.toString());
      feed.add(people.receipient.toString());
    });

    
    const filterLogic = {
      $and: [
        {
          _id: { $nin: Array.from(feed) },
        },
        {
          _id: { $ne: loggedUser._id },
        },
        {
          isOnboarded: true,
        },
      ],
    };


    const [createFeed,total] = await Promise.all([
      User.find(filterLogic)
        .skip(skip)
        .limit(limit)
        .select(
          "fullName bio nativeLanguage learningLanguage location profilePic"
        ),
       User.countDocuments(filterLogic),
    ]);


    res.status(200).json({
      success: true,
      message: `${loggedUser.fullName}'s feed`,
      data: createFeed,
      pagination: {
        total: total,
        page: pageNumber,
        limit: limit,
        hasMore: total > skip + createFeed.length,
      },
    });
  } catch (err) {
    console.log(err.message)
    res
      .status(500)
      .json({ success: false, message: `Internal error : ${err.message}` });
  }
};
