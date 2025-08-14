import responseHandler from "../utils/responseHandler.js";
const { errorResponse } = responseHandler;

//error handler for dev environment
const sendErrorDev = (err, res) => {
  const errResponse = {
    status: err.status || "error",
    message: err.message,
    stack: err.stack,
    error: {
      name: err.names,
      statusCode: err.statusCode,
      isOperational: err.isOperational,
    },
  };
  console.error("ERROR", err);
  res.status(err.statusCode || 500).json(errResponse);
};

//send error for production enviroment
const sendErrorProd = (err, res) => {
  //operational is set true, then we send a message to client
  if (err.isOperational) {
    // return errorResponse(
    //   res,
    //   err.message,
    //   err.statusCode || 500,
    //   err.errors || null
    // ); 
    const errResponse = {
        status: err.status || "error",
        message: err.message,
    };
    return res.status(err.statusCode || 500).json(errResponse); //The previous one commented up was turned to comment because the parameters are wrong
  }
  // programming errors or unknown errors: don't leak errors to client
  console.error("ERROR", err);
  return res.status(err.statusCode).json({
    status: "error",
    message: "Something went wrong",
  });
};

// Handle JWT errors
const handleJWTError = () => {
  return errorResponse("Invalid token. Please log in again", 401);
};
const handleJWTExpiredError = () => {
  return errorResponse("Your token has expired! Please log in again", 401);
};

//main error handler middleware(for index.js file)
export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err, message: err.message, name: err.name };
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();
    sendErrorProd(error, res);
  }
};

//catch 404 error routes
export const catchNotFound = (req, res) => {
  errorResponse  
   (`Cant find ${req.originalUrl} on this server!`,
    404
  );
};
