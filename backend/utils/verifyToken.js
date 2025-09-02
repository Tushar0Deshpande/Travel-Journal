import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json("You are not authenticated!");
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return res.status(403).json("Token is not valid!");
    req.userId = user.id; // decoded JWT ka user id yaha set karenge
    next();
  });
};
