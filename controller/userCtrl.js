const Users = require("../models/userModel");

const userCtrl = {
  //! Register User
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      // Check If All fields are filled with values or not
      if (!name || !email || !password) {
        return res.status(400).json({ masg: "Please fill allfields." });
      }
      // Check If email is valid
      if (!validateEmail(email)) {
        return res.status(400).json({ masg: "Please enter valid email." });
      }
      //Check password length
      if (password.length < 6) {
        return res
          .status(400)
          .json({ masg: "Password must be atleast 6 characters long." });
      }
      const user = await Users.findOne({ email });
      // Check If email is already registered
      if (await Users.findOne({ email })) {
        return res.status(400).json({ masg: "User already exists." });
      }
      res.json({ msg: "User Registered Successfully!" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },
};

//! Exporting User Controller
module.exports = userCtrl;

// Function to validate email
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
