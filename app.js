require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const app = express();

//! Midddlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
  fileUpload({
    userTempFiles: true,
  })
);

//! Routers
app.use("/user", require("./routes/userRouter"));
app.use("/api", require("./routes/upload"));

// Connect to mongodb
const URI = process.env.MONGO_URL;
mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("DB Connected Successfully..!");
    }
  }
);

//! Creating Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Click To Visit: http://127.0.0.1:${port}`);
});
