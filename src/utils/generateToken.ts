import * as jose from "jose";
const secret = Bun.env.JWT_SECRET || "my_secret";

export default async function generateToken(
  payload: jose.JWTPayload,
  expiry?: string
) {
  if (expiry) {
    return await new jose.SignJWT(payload).setExpirationTime(expiry);
  } else {
    return await new jose.SignJWT(payload).setExpirationTime("1d");
  }
}
