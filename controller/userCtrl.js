const Users = require("../models/userModel");

const userCtrl = {
  //! Register User
  register: async (req, res) => {
    try {
      console.log(req.body);
      res.json({ msg: "Register User" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

//! Exporting User Controller
module.exports = userCtrl;
