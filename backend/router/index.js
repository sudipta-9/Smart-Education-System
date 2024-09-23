import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//? user registration
router.post("/register", async (req, res) => {
  try {
    const { name, username, password, email, address, phone } = req.body;
    if (!name || !username || !password || !email || !address || !phone)
      throw Error("Please enter all required fields.");
    //find already registered users
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (existingUser) throw Error("Email already exists!");
    //encript password
    const hash = bcrypt.hashSync(password, 10);
    //create new user
    const newUser = await prisma.user.create({
      data: {
        name: name,
        username: username,
        password: hash,
        email: email,
        address: address,
        phone: phone,
      },
    });
    res
      .status(200)
      .send({ message: "User registration successful", data: newUser });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

//? user login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { username: username },
    });
    if (!user) throw Error("User not found!");
    const passwordCheck = bcrypt.compareSync(password, user.password);
    if (!passwordCheck) throw Error("Wrong password!");
    var token = jwt.sign(
      { uId: user.id, userName: user.username },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );
    res
      .status(200)
      .send({ message: "Login successful", data: user, token: token });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

//? get all user from database
router.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    if (users.length === 0) throw Error("No users found !");
    res.status(200).send({ data: users });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

//? add new user to db
router.post("/add-user", async (req, res) => {
  try {
    const data = req.body;
    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        username: data.username,
        password: data.password,
        email: data.email,
        phone: data.phone,
        address: data.address,
      },
    });
    if (newUser.length === 0) throw Error("Error in user create");
    res
      .status(200)
      .send({ message: "User created successfully", data: newUser });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

//? update user in db
router.post("/update-user", async (req, res) => {
  try {
    const data = req.body;
    const updatedUser = await prisma.user.update({
      where: { id: data.id },
      data: {
        name: data.name,
        username: data.username,
        password: data.password,
        email: data.email,
        phone: data.phone,
        address: data.address,
      },
    });
    if (updatedUser.length === 0) throw Error("No user found to update");
    res
      .status(200)
      .send({ message: "User updated successfully", data: updatedUser });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

//?delete user in db
router.get("/delete-user", async (req, res) => {
  try {
    const { id } = req.query;
    const deletedUser = await prisma.user.delete({
      where: { id: id },
    });
    if (deletedUser.affectedRows === 0) throw Error("No user found to delete");
    res
      .status(200)
      .send({ message: "User deleted successfully", data: deletedUser });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

router.get("/profile", async (req, res) => {
  try {
    const { uId } = req.query;
    const user = await prisma.user.findUnique({
      where: { id: uId },
    });
    if (!user) throw Error("User not found!");
    res.status(200).send({ data: user });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

export default router;
