const userModel = require("../Models/userModel");
const { hashPassword } = require("../middlewares/authHelpers");

const GetUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "users",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error interno del servidor",
    });
  }
};
const RegisterUser = async (req, res) => {
  const { name, email, password, phone, address, answer, rol } = req.body;
  if (!name || !email || !password || !phone || !address || !answer || !rol) {
    return res.status(400).send({ message: "All fields are required" });
  }
  const ExitingUser = await userModel.findOne({ email });
  if (ExitingUser) {
    return res.status(200).send({
      success: false,
      message: "User already registered",
    });
  }
  const hashPassword1 = await hashPassword(password);
  const newUser = new userModel({
    name,
    email,
    password: hashPassword1,
    phone,
    address,
    answer,
    rol,
  });
  await newUser.save();
  res.status(201).send({
    success: true,
    message: "User registered successfully",
    user: newUser,
  });
};
const DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "User Deleted Succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error deleting category",
    });
  }
};
const UpdateUser = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer, rol } = req.body;
    const { id } = req.params;
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character" });
    }
    const hashed = password ? await hashPassword(password) : password;
    const updateuser = await userModel.findByIdAndUpdate(
      id,
      {
        name: name,
        email: email,
        phone: phone,
        address: address,
        answer: answer,
        role: rol,
        password: hashed,
      },
      {
        new: true,
      }
    );
    res.status(200).send({
      success: true,
      message: "User Update Successfully",
      updateuser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error interno del servidor",
    });
  }
};
module.exports = {
  GetUsers,
  RegisterUser,
  DeleteUser,
  UpdateUser,
};
