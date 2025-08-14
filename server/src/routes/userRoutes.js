import express from "express";
import {
  register,
  login,
  authenticateUser,
  // logoutUser,
  refreshAccessToken,
  verifyUserAccount,
  resendVerificationToken,
  forgotPassword,
  resetPassword,
  logout
} from "../controllers/userController.js";
import { validateFormData } from "../middlewares/validateForm.js";
import {
  validateLoginSchema,
  validateSignInSchema,
  validateAccountSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../utils/dataSchema.js";
import { verifyAuth } from "../middlewares/authenticate.js";
import { rateLimiter, refreshTokenLimit } from "../middlewares/rateLimit.js";
import { cacheMiddleware, clearCache } from "../middlewares/cache.js";

const router = express.Router();

router.post("/create", validateFormData(validateLoginSchema), register); //validateformdata serves as a middleware and what we need to pass was the sign up schema, then we also need to pass the next function
router.post(
  "/login",
  rateLimiter,
  validateFormData(validateSignInSchema),
  login
);

router.get(
  "/user",
  verifyAuth,
  cacheMiddleware("auth_user,3600"),
  authenticateUser
);

// router.post("/logout", verifyAuth, clearCache("auth_user"), logoutUser);
router.post("/refresh-token", refreshTokenLimit, refreshAccessToken);

router.patch(
  "/verify-account",
  rateLimiter,
  verifyAuth,
  validateFormData(validateAccountSchema),
  clearCache("auth_user"),
  verifyUserAccount
);

router.post(
  "/resend/verify-token",
  rateLimiter,
  verifyAuth,
  resendVerificationToken
);

router.post(
  "/forgot-password",
  rateLimiter,
  validateFormData(forgotPasswordSchema),
  forgotPassword
);

router.patch(
  "/reset-password",
  rateLimiter,
  validateFormData(resetPasswordSchema),
  resetPassword
);

router.post ("/logout", verifyAuth, clearCache("auth_user"), logout);

export default router;
