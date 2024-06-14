import { ElysiaApp } from "..";
import {
  changePassword,
  refetchUser,
  resetPassword,
  signIn,
  signUp,
  updateProfile,
} from "../controllers/userController";

export default (app: ElysiaApp) => {
  app
    .post("/auth/sign-up", async (body: any) => {
      return await signUp(body);
    })
    .post("/auth/sign-in", async (body: any) => {
      return await signIn(body);
    })
    .post("/user/me", async (headers: any) => {
      return refetchUser(headers);
    })
    .patch("/user/update-profile", async ({ headers, body }: any) => {
      return updateProfile(headers, body);
    })
    .post("/user/change-password", async ({ headers, body }: any) => {
      return changePassword(headers, body);
    })
    .post("/user/reset-password", async (body: any) => {
      return resetPassword(body);
    });
};
