import jwt, { JwtPayload, Secret, SignOptions, VerifyOptions } from "jsonwebtoken";

// Check for SECRET_KEY at initialization
const SECRET_KEY: Secret = process.env.JWT_SECRET as string;
if (!SECRET_KEY) {
  throw new Error("JWT_SECRET environment variable is not defined");
}

export const signJwt = (
  payload: object, 
  options: SignOptions = { expiresIn: "1d" }
): string => {
  return jwt.sign(payload, SECRET_KEY, options);
};

export const verifyJwt = <T = any>(
  token: string,
  options?: VerifyOptions
): (T & JwtPayload) | null => {
  try {
    return jwt.verify(token, SECRET_KEY, options) as (T & JwtPayload);
  } catch (error) {
    // Optionally log the error or handle different error types differently
    return null;
  }
};