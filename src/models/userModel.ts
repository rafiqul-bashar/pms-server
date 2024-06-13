import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name should not be blank."],
      min: [8, "Name is too short! Enter Fullname."],
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "Email can't be blank"],
      match: [/\S+@\S+\.\S+/, "looks like invalid!"],
      index: true,
    },
    password: { type: String, required: true },
    image: String,
    admin: Boolean,
    token: String,
    resetOtp: String,
    otpExpires: Date,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
