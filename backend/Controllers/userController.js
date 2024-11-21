import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import displayError from "../Middlewares/displayError.js";
import User from "../Models//userSchema.js";

const UserRegister = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return next(displayError(409, "Email is already in use."));
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    const createdUser = await user.save();
    //console.log(createdUser);
    
    const token = jwt.sign(
      { id: createdUser._id },
      process.env.JWT,
      {
        expiresIn: "10h",
      }
    );
    return res.status(201).json({ token, user });
  } catch (err) {
    next(err);
  }
};

const UserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email }).exec();
    if (!user) {
      return next(displayError(409, "User not found."));
    }

    const isPasswordCorrect = await bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return next(displayError(403, "Incorrect password"));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "10h",
    });
    return res.status(200).json({ token, user });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.body;
    const user = await User.findById(id);
    user.prevtests = [];
    await user.save();
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export default { UserLogin, UserRegister, getUser, updateUser };