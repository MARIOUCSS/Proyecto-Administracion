const express = require("express");
const mongoose = require("mongoose");
//const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.get("/", (req, res) => {
  res.send({
    message: "bienvenido",
  });
});

const port = process.env.PORT || 3000;
const uri = process.env.DB_URI;

//Midleware
app.use(cors());
app.use(express.json());
//
const auth = require("./Routes/authRoute");
app.use("/api/v1/auth", auth);
const catRoute = require("./Routes/categoryRoute");
app.use("/api/v1/category", catRoute);
const userRoute = require("./Routes/userRoute");
app.use("/api/v1/user", userRoute);
////
app.listen(port, () => {
  console.log(`servidor corriendo ${port}`);
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
