import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (email) => {
          return validator.isEmail(email);
        },
        message: "Invalid email format",
      },
    },
    profilePic: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      validate: {
        validator: (password) => {
          return validator.isStrongPassword(password);
        },
        message: "Password is weak",
      },
    },
    bio: {
      type: String,
      default: "Passionate full-stack dev",
      validate: {
        validator: (bio) => {
          return bio.trim().split(/\s+/).length <= 20;
        },
        message: "Bio should be less than 20 words",
      },
    },
    nativeLanguage: {
      type: String,
      default: "",
    },
    learningLanguage: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    isOnboarded: {
      type: Boolean,
      default: false,
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

export const User = mongoose.model("User", userSchema);
