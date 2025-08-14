import { ZodError } from "zod";

export const validateFormData = (schema) => (req, res, next) => {
  try {
    //recieve and transform dad gotten from the client through the req.body
    const parsedData = schema.parse(req.body);
    req.body = parsedData; // transfromed data with no error
    next(); // call the next action thats supposed to happen - invoke the api function
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.issues.map((issue) => ({
        message: `${issue.path.join(".")} is ${issue.message}`,
      }));
      return res.status(400).json({
        error: "validation failed",
        details: errorMessages,
      });
    }
        next(error) //pass error to next handler
  }
};
