const express = require("express");
const bcrypt = require("bcryptjs");
const {
  authenticator,
} = require("../scripts/auth");
const asyncHandler = require("../scripts/asynchandler");

const Moderator = require('../models/moderator.model');

const router = express.Router();

// TODO
//* GET: Moderator who is authenticated
// router.get(
//   "/",
//   authenticator,
//   asyncHandler(async (req, res) => {
//     res.status(200).json(req.moderator);
//   })
// );

module.exports = router;