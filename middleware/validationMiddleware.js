import { body, param, validationResult } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/customError.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import Job from '../models/JobModel.js'
import User from '../models/UserModel.js'

import mongoose from'mongoose'


const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if(errorMessages[0].startsWith('no job')) {
            throw new NotFoundError(errorMessages)
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationErrors([
  body("company").notEmpty().withMessage("company is required"),
  body("position").notEmpty().withMessage("position is required"),
  body("jobLocation").notEmpty().withMessage("jobLocation is required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("wrong job status"),
  body("jobType").isIn(Object.values(JOB_TYPE)).withMessage("wrong job type"),
]);

export const validateIdParam = withValidationErrors([
  param("id")
    .custom(async (value) => {
        const isValidId =  mongoose.Types.ObjectId.isValid(value)
        if(!isValidId) throw new BadRequestError('invalid mongo db id')
        
        const job = await Job.findById(value)
        if(!job) throw new NotFoundError(`no job with id ${value}`)

    })
]);

export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email").notEmpty().withMessage("email is required").isEmail().withMessage("invalid email format").custom(async (email) => {
    const user = await User.findOne({email})
    if(user) {
      throw new BadRequestError('Email already exists')
    }
  }),
  body("password").notEmpty().withMessage("password is required").isLength({min: 8}).withMessage("password must be at least 8 characters long"),
]);

export const validateLoginInput = withValidationErrors([
  body("email").notEmpty().withMessage("email is required").isEmail().withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);
