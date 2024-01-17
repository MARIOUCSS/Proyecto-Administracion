//import bcrypt from "bcrypt";
const bcrypt = require("bcrypt");
// const salt = await bcrypt.genSalt(10);
// user.password = await bcrypt.hash(user.password, salt);
const hashPassword = async (password) => {
  try {
    const saltRound = 10;
    const haspasword = await bcrypt.hash(password, saltRound);
    return haspasword;
  } catch (error) {
    console.log(error);
  }
};
const comparepassword = async (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};

module.exports = { hashPassword, comparepassword };
