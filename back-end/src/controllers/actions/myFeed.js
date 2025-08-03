import { Connection } from "../../models/Connection.js";
import { User } from "../../models/User.js";

export const myFeed = async (req, res) => {
  const loggedUser = req.user;
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

    console.log(feed);

    const createFeed = await User.find({
      $and: [
        {
          _id: { $nin: Array.from(feed) },
        },
        {
          _id: { $ne: loggedUser._id },
        },
        {
         isOnboarded : true
        }
      ],
    }).select("fullName bio");


    res.status(200).json({success:true,message:`${loggedUser.fullName}'s feed`,data:createFeed})
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: `Internal error : ${err.message}` });
  }
};

