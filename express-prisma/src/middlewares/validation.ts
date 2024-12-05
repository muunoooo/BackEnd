import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const validateRegister = [
  body("username").notEmpty().withMessage("username is required!"),
  body("email")
    .notEmpty()
    .withMessage("email is required!")
    .isEmail()
    .withMessage("invalid format email!"),
  body("password")
    .notEmpty()
    .withMessage("password is required!")
    // .isStrongPassword({minLength:3,minUppercase:1})
    .isLength({ min: 3 })
    .withMessage("password must be 3 characters at minumum!"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("confirmPassword is required!")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password not match!");
      }
      return true;
    }),

  (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).send({ errors: error.array() });
    }
    next();
  },
];
