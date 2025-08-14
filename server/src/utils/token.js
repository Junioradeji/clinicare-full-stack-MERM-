import jwt from "jsonwebtoken";

export const signToken = (id) => {
  const accessToken = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES,
  });
  const refreshToken = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES,
  });
  return { accessToken, refreshToken };
};

export const createSendToken = (user) => {
  if (!user) return;
  const token = signToken(user._id); //this is from mongodb id document
  //create cookie to store our refreshToken in order to prevent browser access to the client side
  //in order to do this install a cookie package called cookie-parser
  const isProductionn = process.env.NODE_ENV === "production";
  const cookieOptions = {
    httpOnly: true, //cookie is not accessible in javascript
    secure: isProductionn, //sends cookie over HTTPS only when in production environment
    maxAge: 7 * 24 * 60 * 60 * 1000, //cookies is valid for 7mins
    path: "/api/v1/auth/refresh-token", //cookie is valid only on this path but if its a / it is  accross your domain
    sameSite: isProductionn ? "none" : "lax",  // is required when the cookie is being used on different domains. we want to adjust the cross-site request policy. Our app is bot client/server which ha s different address so we want to ensure that in production mode, the cookie can passed over a secure relay by setting the secure option to true (ensuring cookie is sent over HTTPS), but in dev mode we specify lax because we need to use it locally. if same set is set to none and secure is set to false, the browser will reject the cookie.
  };
  return {
    accessToken:token.accessToken,
    refreshToken:token.refreshToken,
    cookieOptions,
  };
};
