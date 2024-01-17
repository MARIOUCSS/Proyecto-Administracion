const userModel = require("../Models/userModel");
const JWT = require("jsonwebtoken");
const { hashPassword, comparepassword } = require("../middlewares/authHelpers");
const RegisterController = async (req, res) => {
  const { name, email, password, phone, address, answer } = req.body;

  if (!name || !email || !password || !phone || !address || !answer) {
    return res.status(400).send({ message: "All fields are required" });
  }
  const existingUser = await userModel.findOne({ email });
  //res.send(existingUser);
  if (existingUser) {
    return res.status(200).send({
      success: false,
      message: "User already registered",
    });
  }
  //hashe contraseña
  const hashedpassword = await hashPassword(password);
  const NeWUser = new userModel({
    name,
    email,
    password: hashedpassword,
    phone,
    address,
    answer,
  });
  await NeWUser.save();
  res.status(201).send({
    success: true,
    message: "User registered successfully",
    user: NeWUser,
  });
};

const Logincontroller = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .send({ success: false, error: "email or password invalidate" });
  }
  const user = await userModel.findOne({ email });
  if (!user)
    return res
      .status(404)
      .send({ success: false, message: "Email not register" });
  //si es el email pero no la contraseña
  const match = await comparepassword(password, user.password);
  if (!match) {
    return res
      .status(200)
      .send({ success: false, message: "invalid password" });
  }
  const token = await JWT.sign(
    { _id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  res.status(200).send({
    success: true,
    message: "login sucess",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
    },
    token,
  });
};
const ForgotPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    console.log(req.body);
    if (!email || !newPassword) {
      return res.status(400).send({
        success: false,
        message: "Datos de email,answer,NewPassword is required",
      });
    }
    //check
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "No se encontró un usuario con el email proporcionado",
      });
    }
    // Actualiza la contraseña solo si se proporciona una nueva contraseña
    if (newPassword) {
      const hashed = await hashPassword(newPassword);
      await userModel.findByIdAndUpdate(user._id, { password: hashed });
    }
    res.status(200).send({
      success: true,
      message: "New Password",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "something went wrong",
      error,
    });
  }
};
module.exports = {
  RegisterController,
  Logincontroller,
  ForgotPasswordController,
};
