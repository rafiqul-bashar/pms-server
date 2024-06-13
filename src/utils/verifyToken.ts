import * as jose from "jose";
const secret = Bun.env.JWT_SECRET || "my_secret";
export default async function verifyToken(headers: any) {
  const authHeader = headers?.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return {
      success: false,
      message: "Looks like unauthorized request or missing  token.!",
    };
  }
  const token = authHeader.split(" ")[1];

  if (!token) {
    return {
      message: "Missing Token! Looks like fault attempt!",
      success: false,
    };
  }
  try {
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );
    if (payload?.exp) {
      return {
        payload,
        success: true,
      };
    }
    return {
      message: "Token has expired! Please Login.",
      access: false,
    };
  } catch (error) {
    console.error("Token verification failed:", error);
    return { success: false, message: "Token verification failed." };
  }
}
