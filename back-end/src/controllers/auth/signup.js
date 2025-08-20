import { User } from "../../models/User.js";
import { validateSignUp } from "../../utils/validate.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { upsertUserStream } from "../../lib/stream.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    validateSignUp(req.body);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({
          message: "Email Already exists,please use another email",
          success: false,
        });
      // return throw new Error("Email Already exists,please use another email");
    }

    const randomNumber = Math.floor(Math.random() * 100) + 1;
    const profilePic = `https://avatar.iran.liara.run/public/${randomNumber}`;

    const newUser = new User({
      fullName,
      email,
      password,
      profilePic,
    });
    await newUser.save();

     await upsertUserStream({
      id: newUser._id.toString(),
      name: newUser.fullName,
      image: newUser.profilePic,
    });
    

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("myCookie", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({
      messge: "User created successfully",
      data: newUser,
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message, valErrors: err.valErrors });
  }
};
