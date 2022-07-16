import express from "express";
import {
  signup,
  login,
  getProfile,
  updateProfile,
  updatePassword,
  getAllUsers,
  getUserById
} from "../controllers/userControllers.js";
import { check } from "express-validator";
import { validationCheck } from "../middlewares/validator.js";
import { protect } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.route("/login").post(login);

userRouter
  .route("/signup")
  .post(
    [
      check("name", "Name field can not be empty.").notEmpty(),
      check("email", "Invalid email.").isEmail(),
      check("gender", "Gender field can not be empty.").notEmpty(),
      check(
        "dateOfBirth",
        "Inavlid Date of Birth. A valid date format required."
      )
        .trim()
        .isDate(),
      check(
        "password",
        "Invalid Password. Password must contain: at least 8 characters, an uppercase letter, a lowercase letter, a number and a special character."
      ).isStrongPassword(),
    ],
    validationCheck,
    signup
  );

userRouter
  .route("/profile")
  .get(protect, getProfile)
  .patch(
    protect,
    [
      check("name", "Name field can not be empty.")
        .optional({ nullable: true })
        .notEmpty().withMessage("name not valid"),
      check("email", "Invalid email.").optional({ nullable: true }).isEmail().withMessage("email not valid"),
      check("gender", "Gender field can not be empty.")
        .optional({ nullable: true })
        .notEmpty().withMessage("gender not valid"),
      check(
        "dateOfBirth",
        "Inavlid Date of Birth. A valid date format required."
      )
        .optional({ nullable: true })
        .trim()
        .isDate().withMessage("dob not valid"),
      // check(
      //   "password",
      //   "Invalid Password. Password cannot be empty."
      // ).notEmpty(),
    ],
    validationCheck,
    updateProfile
  )
// .put(
//   protect,
//   [
//     check("oldPassword", "Old password required.").notEmpty(),
//     check("newPassword")
//       .notEmpty()
//       .withMessage("New password required.")
//       .isStrongPassword()
//       .withMessage(
//         "Invalid Password. Password must contain: at least 8 characters, an uppercase letter, a lowercase letter, a number and a special character."
//       ),
//   ],
//   validationCheck,
//   updatePassword
// );

userRouter.route("/").get(getAllUsers);

userRouter.route("/user/:userId").get(getUserById);

export default userRouter;
