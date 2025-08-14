import jwt from "jsonwebtoken";
import { promisify } from "util";
import User from "../models/user.js";
import tryCatchFn from "../utils/tryCatchFn.js";
import responseHandler from "../utils/responseHandler.js";
const { forbiddenResponse, unauthorizedResponse } = responseHandler;

export const verifyAuth = tryCatchFn(async (req, res, next) => {
  //check if a token exists
  let token;
  //checking for our token in the request headers object and ensuring it starts with word Bearer signature word ensuring its jwt type token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]; //extracts the token without Bearer
  }
  if (!token) {
    return next(
      unauthorizedResponse(
        "You are not logged in!, Please log in to gain access"
      )
    );
  }
  //verify the token
  //promisify is used to await a promise from a callback
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );
  //check if a user exists with our decoded id
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      unauthorizedResponse(
        "The user belonging to this token does no longer exist."
      )
    );
  }
  //assign the user to the request object so that it can be accessed in the next middleware or controller
  req.user = currentUser;
  next(); //pass to the next event
});

//roled based auth
export const authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        forbiddenResponse("You do not have permission to perform this acction")
      );
    }
    next();
  };
};
