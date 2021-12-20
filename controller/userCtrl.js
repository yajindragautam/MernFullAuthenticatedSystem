const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("../controller/sendMail");

const { CLIENT_URL } = process.env.CLIENT_URL;
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
      // Bcrypt password
      const passwordHash = await bcrypt.hash(password, 12);
      const newUser = { name, email, password: passwordHash };
      const activation_token = createActivationToken(newUser);
      const url = `${CLIENT_URL}/user/activate/${activation_token}`;
      sendMail(email, url, "Verify your email");

      res.json({
        msg: "User Registered Success! Please activate your email to start.!",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },

  //! Activate User
  activate: async (req, res) => {
    try {
      const { activation_token } = req.body;
      const user = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRRET
      );
      const { name, email, password } = user;
      const check = await Users.findOne({ email });
      if (check) {
        return res.status(400).json({ msg: "User already activated." });
      }
      const newUser = new Users({ name, email, password });
      await newUser.save();
      res.json({ msg: "User Activated Successfully!" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },

  //! Login User
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      // Check If All fields are filled with values or not
      if (!email || !password) {
        return res.status(400).json({ masg: "Please fill allfields." });
      }

      // Check If email is valid
      if (!validateEmail(email)) {
        return res.status(400).json({ masg: "Please enter valid email." });
      }

      // Check If email is registered
      const user = await Users.findOne({ email });
      if (!user) {
        return res.status(400).json({ masg: "User not registered." });
      }
      // Check If password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ masg: "Incorrect password." });
      }
      // Create Refresh Token
      const refresh_token = createRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      });
      res.json({
        msg: "Login Success!",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },

  //! Access Token
  getAccessToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;

      if (!rf_token) {
        return res.status(401).json({ msg: "No refresh token." });
      }
      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRRET, (err, user) => {
        if (err) {
          return res.status(401).json({ msg: "Invalid refresh token." });
        }
        const access_token = createAccessToken({ id: user.id });
        res.json({ access_token });
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  //! Forget Password
  forgetPassword: async (req, res) => {
    try {
      const { email } = req.body;
      // Check If email is registered
      const user = await Users.findOne({ email });
      if (!user) {
        return res.status(400).json({ masg: "User not registered." });
      }
      const access_token = createAccessToken({ id: user._id });
      const url = `${CLIENT_URL}/user/reset/${access_token}`;
      sendMail(email, url, "Reset your password");
      res.json({ msg: "Email sent successfully. Please Check Your Email.!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  //! Reset Password
  resetPassword: async (req, res) => {
    try {
      const { password } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);

      await Users.findOneAndUpdate(
        {
          _id: req.user.id,
        },
        {
          password: passwordHash,
        }
      );
      res.json({ msg: "Password Reset Successfully!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  //! Get User  Info
  getUserInfo: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");
      res.json({ user });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  //! Get All Users Information As Admin
  getUsersAllInfo: async (req, res) => {
    try {
      console.log(req.user);
      const users = await Users.find().select("-password");
      res.json(users);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  //! Logoin User
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      res.json({ msg: "Logout Success!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  //! Update User Info
  updateUser: async (req, res) => {
    try {
      const { name, avatar } = req.body;
      await Users.findOneAndUpdate({ _id: req.user.id }, { name, avatar });
      res.json({ msg: "User Updated Successfully!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  //! Update User Permission
  updateUsersRole: async (req, res) => {
    try {
      const { role } = req.body;
      await Users.findOneAndUpdate({ _id: req.user.id }, { role });
      res.json({ msg: "User Updated Successfully!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
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
// Function to create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_TOKEN_SECRRET, {
    expiresIn: "5m",
  });
};
//Ativation Access Token
const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRRET, {
    expiresIn: "15m",
  });
};
//Activation Refresh Token
const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRRET, {
    expiresIn: "7d",
  });
};
