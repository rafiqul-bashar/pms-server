import User from "../models/userModel";
import * as jose from "jose";
import { verifyToken } from "../utils";
import { sendEmail } from "../utils/mailService";

const secret = Bun.env.JWT_SECRET || "my_secret";

export const signUp = async ({ body }: any) => {
  try {
    const hash = await Bun.password.hash(body?.password);
    const hashedUser = { ...body, password: hash };
    const newUser = new User(hashedUser);
    await newUser.save();
    return hashedUser;
  } catch (error) {
    console.error("Error creating Category:", error);
    throw error;
  }
};

export const signIn = async ({ body }: any) => {
  try {
    const user = await User.findOne({ email: body?.email });
    if (!user) {
      return "No user found! Check email or Register an account!";
    }

    const isMatch = await Bun.password.verify(body?.password, user.password);
    if (!isMatch) {
      return "Wrong Password!!";
    }

    //  generate token
    const token = await new jose.SignJWT({
      email: user?.email,
      id: user?._id,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1d")
      .sign(new TextEncoder().encode(secret));

    // Save token in user document
    user.token = token;
    await user.save();

    return user;
  } catch (error) {
    console.error("Something went wrong!!", error);
    throw error;
  }
};
export const refetchUser = async ({ headers }: any) => {
  const { success, message, payload } = await verifyToken(headers);
  if (success) {
    const user = await User.findOne({ email: payload?.email });
    return user;
  }
  return message;
};
export const updateProfile = async (headers: any, body: any) => {
  const { success, message, payload } = await verifyToken(headers);

  if (success) {
    try {
      //  update profile logic
      const updatedUser = await User.findOneAndUpdate(
        { email: payload?.email },
        body,
        {
          new: true,
        }
      );
      return updatedUser;
    } catch (error) {
      console.log(error);
    }
  }
  return message;
};
export const changePassword = async (headers: any, body: any) => {
  const { success, message, payload } = await verifyToken(headers);
  const { currentPassword, newPassword } = body;
  if (!currentPassword || !newPassword) {
    return "Looks like current password or new password is missing!";
  }
  if (success) {
    const user = await User.findOne({ email: payload?.email });
    try {
      if (!user) {
        return "No user found!!";
      }

      const isMatch = await Bun.password.verify(currentPassword, user.password);
      if (!isMatch) {
        return "Looks like current password is wrong!";
      }
      user.password = await Bun.password.hash(newPassword);
      await user.save();
      return "Password changed successfully!";
    } catch (error) {
      console.log(error);
    }
  }
  return message;
};

export const resetPassword = async ({ body }: any) => {
  const user = await User.findOne({ email: body?.email });
  if (!user) {
    return "No user found! Check email or Register an account!";
  }

  try {
    if (body?.hasOTP) {
      //  if already have the otp

      // Verify OTP
      const currentTime = new Date();
      // Check if OTP is invalid
      if (user?.resetOtp !== body?.OTP) {
        return "Invalid OTP";
      }
      // Check if OTP has expired
      if (user?.otpExpires && user?.otpExpires <= currentTime) {
        return "Expired OTP";
      }

      // after valid otp change password

      // Update password
      user.password = body?.newPassword;
      user.resetOtp = undefined; // Clear OTP fields
      user.otpExpires = undefined;
      await user.save();

      return "Password updated successfully! Please Login.";
    } else {
      // create and send otp to verify
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      // Save  OTP
      user.resetOtp = otp;
      user.otpExpires = new Date(Date.now() + 180000); // OTP validity in 3 mins
      await user.save();

      // send otp
      const emailContain = `Dear ${user?.name},\n\nYou have requested to reset your password. Please use the following OTP: ${user?.resetOtp}. This OTP will expire in 3 minutes.\n\nThank you,\nPMS Service`;
      sendEmail(user?.email, "Reset Password!", emailContain);
      return "Check your email for OTP.";
    }
  } catch (error) {
    console.log(error);
  }
};
