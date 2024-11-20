import express from "express";
import UserControllers from "../Controllers/userController.js";
const { UserLogin, UserRegister, getUser, updateUser } = UserControllers;

import verifyToken from "../Middlewares/verifyUser.js";

const router = express.Router();

router.post("/signup", UserRegister);
router.post("/signin", UserLogin);
router.get("/", verifyToken, getUser);
router.put("/", verifyToken, updateUser);

export default router;