import userService from "../services/user.service.js";
import tryCatchFn from "../utils/tryCatchFn.js";
import { createSendToken } from "../utils/token.js";
import responseHandler from "../utils/responseHandler.js";
const { successResponse } = responseHandler;

export const register = tryCatchFn(async (req, res, next) => {
  //req.body handles forms collections from the client
  //req.body is the data thas has passed zod's validation recieved from the req.body
  const user = await userService.register(req.body, next);
  //handle accessToken generation - we send the user to our createdSendToken which extracts the id from jwt to sign
  if (!user) return;
  const { accessToken, refreshToken, cookieOptions } = createSendToken(user);
  //send the cookie
  res.cookie("userRefreshToken", refreshToken, cookieOptions);
  return successResponse(res, { accessToken }, "Registration successful", 201); //status 201 means that the 201 is for a new  successful user
});

export const login = tryCatchFn(async (req, res, next) => {
  const user = await userService.login(req.body, next);
  if (!user) return;
  const { accessToken, refreshToken, cookieOptions } = createSendToken(user);
  res.cookie("userRefreshToken", refreshToken, cookieOptions);
  return successResponse(res, { accessToken }, "Login successful", 200);
});

export const authenticateUser = tryCatchFn(async (req, res, next) => {
  const { id: UserId } = req.user; //extract user id from the request.user
  const user = await userService.authenticateUser(UserId, next);
  return successResponse(res, user, "User authenticated", 200);
});

// export const logoutUser = tryCatchFn(async (req, res, next) => {
//   const user = await userService.logoutUser(req, res, next);
//   if (!user) return;
//   //send a success response
//   return successResponse(res, user, "Logged out successfully", 200);
// });

export const refreshAccessToken = tryCatchFn(async (req, res, next) => {
  //get the refreshtoken from the cookie
  const refreshToken = req.cookies?.userRefreshToken;
  const user = await userService.refreshAccessToken(refreshToken, next);
  if (!user) return;
  const tokenData = createSendToken(user);
  if (!tokenData) return;
  const { accessToken } = tokenData;
  return successResponse(
    res,
    { accessToken },
    "AccessToken refreshed successfully",
    200
  );
});

export const verifyUserAccount = tryCatchFn(async (req, res, next) => {
  const { id: userId } = req.user;
  const data = await userService.verifyUserAccount(
    { userId, ...req.body },
    next
  );
  if (!data) return;
  return successResponse(res, data, "Account verified successfully", 200);
});

export const resendVerificationToken = tryCatchFn(async (req, res, next) => {
  const { id: userId } = req.user;
  const user = await userService.resendVerificationToken(userId, next);
  if (!user) return;
  return successResponse(
    res,
    null,
    "Verification token has been sent to your email",
    200
  );
});

export const forgotPassword = tryCatchFn(async (req, res, next) => {
  const user = await userService.forgotPassword(req.body, next);
  if (!user) return;
  return successResponse(
    res,
    null,
    "Password reset link has been sent to your email",
    200
  );
});

export const resetPassword = tryCatchFn(async (req, res, next) => {
  const email = req.query.email || "";
  const passwordResetToken = req.query.token || "";
  const responseData = await userService.resetPassword(
    { ...req.body, email, passwordResetToken },
    next
  );
  if (!responseData) return;
  return successResponse(res, null, "Password reset successfully", 200);
});

export const logout = tryCatchFn(async (req, res, next) => {
  const responseData = await userService.logout(req, res, next);
  if (!responseData) return;
    return successResponse(res, responseData, "Logged out successfully", 200);
});

