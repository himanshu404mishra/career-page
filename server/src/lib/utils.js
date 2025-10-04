import jwt from "jsonwebtoken";

export const generateToken = function (adminId, res) {
  const token = jwt.sign({ adminId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7d -> MS
    httpOnly: true, // prevents attacks cross-site scripting attack
    sameSite: "none", // CSRF attacks corss-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
    path: "/",
  });

  return token;
};
