import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: [50, "Full name cannot be more than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false, //prevent password field from being sent to client
    },
    dateOfBirth: {
      type: Date,
    },
    phone: {
      type: String,
      maxlength: [14, "phone number must not exceed 14 digits"],
    },
    avatar: {
      type: String,
      default: "",
    },
    avatarId: {
      type: String, //field is to track the id attached to our avatar url from cloudinary
    },
    role: {
      type: String,
      enum: ["patient", "doctor", "nurse", "staff", "admin"], // predefined options that must be selected
      default: "patient",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      select: false,
    },
    verificationTokenExpiry: {
      type: Date,
      select: false,
    },
    passwordResetToken: {
      type: String,
      select: false,
    },
    passwordResetTokenExpiry: {
      type: Date,
      select: false,
    },
    isCompletedOnboard: {
      type: Boolean,
      default: false,
      select: function () {
        return this.role === "patient";
      }, //show field only if the user role is "patient"
    },
  },
  {
    timestamps: true, //includes a creatAt and updateAt when a document is created
  }
);

const User = mongoose.models.User || model("User", userSchema); //this checks if a model named User  already exists to prevent subsequent checks. if it does not exist then it creats it. It is useful when compiling your schema as you make changes
export default User;
