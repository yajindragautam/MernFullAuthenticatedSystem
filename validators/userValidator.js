const { checkSchema } = require("express-validator");
const mongoose = require('mongoose');
const Users = require('../models/userModel');

const UserValidator = checkSchema({
  name: {
    trim: true,
    isLength: {
      options: { min: 1, max: 255 },
      errorMessage: "Name is required",
    },
    email: {
      isEmail: {
        errorMessage: "Please Enter Valid Email!",
      },
      isLength: {
        options: { min: 1, max: 255 },
        errorMessage: "Email is required",
      },
      trim: true,
    },
  },
  password: {
    isLength: {
      options: { min: 6, max: 255 },
      errorMessage: "Password Must Be six Characters",
    },
  },
});

//! Exporting User Validator
module.exports = UserValidator;
