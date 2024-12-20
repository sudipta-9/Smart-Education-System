import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { addDays  } from 'date-fns';

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//? user registration
router.post("/register", async (req, res) => {
  try {
    const { name, username, password, email, address, phone } = req.body;
    if (!name || !username || !password || !email || !address || !phone)
      throw Error("Please enter all required fields.");
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (existingUser) throw Error("Email already exists!");
    const hash = bcrypt.hashSync(password, 10);
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

// profile add
router.get("/profile", async (req, res) => {
  try {
    const { uId } = req.query;
    if (!uId) {
      return res.status(400).send({ message: "User ID is required" });
    }
    const user = await prisma.user.findUnique({
      where: { id: uId },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ data: user });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Get all courses
router.get("/courses", async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      where: {
        url: { not: null },
      },
    });
    if (courses.length === 0) {
      return res.status(404).send({ message: "No courses found!" });
    }
    res.status(200).send({ data: courses });
  } catch (error) {
    res.status(500).send({ message: "Server error: " + error.message });
  }
});

// Add new courses
router.post("/add-course", async (req, res) => {
  try {
    const courses = req.body;
    if (!Array.isArray(courses) || courses.length === 0) {
      return res.status(400).send({
        message: "Input data must be a non-empty array of courses",
      });
    }

    const newCourses = await prisma.course.createMany({
      data: courses.map(course => ({
        title: course.title,
        level: course.level,
        url: course.url,
        skills: course.skills,
      })),
    });

    res.status(201).send({
      message: "Courses created successfully",
      data: newCourses,
    });
  } catch (error) {
    res.status(400).send({
      message: "Error creating courses: " + error.message,
    });
  }
});

// Delete a course
router.delete("/delete-course", async (req, res) => {
  try {
    const { id } = req.query;
    const deletedCourse = await prisma.course.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).send({ message: "Course deleted successfully", data: deletedCourse });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

// Fetch all jobs
router.get("/jobs", async (req, res) => {
  try {
    const jobs = await prisma.jobs.findMany({
      where: {
        postUrl: { not: null }, // Use the correct field name here
      },
    });
    if (jobs.length === 0) {
      return res.status(404).send({ message: "No jobs found!" });
    }
    res.status(200).send({ data: jobs });
  } catch (error) {
    res.status(500).send({ message: "Server error: " + error.message });
  }
});

// Add new jobs
router.post("/add-jobs", async (req, res) => {
  try {
    const jobs = req.body;
    if (!Array.isArray(jobs) || jobs.length === 0) {
      return res.status(400).send({
        message: "Input data must be a non-empty array of jobs",
      });
    }

    const formattedJobs = jobs.map(job => {
      const randomDays = Math.floor(Math.random() * 30);
      let jobDate;

      // Check if job.date exists and is in a valid format using a regular expression
      if (job.date && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(job.date)) {
        jobDate = new Date(job.date);
      } else if (job.date && !isNaN(new Date(job.date).getTime())) {
        jobDate = new Date(job.date);
      } else {
        // If no valid date is provided, use a random date within the past 30 days
        jobDate = addDays(new Date(), -randomDays);
      }

      // Format the date to ISO-8601 format
      const formattedDate = jobDate.toISOString();

      // Generate a random experience if months_experience is null or undefined
      const experience = job.months_experience != null ? job.months_experience : Math.floor(Math.random() * 12);

      return {
        employmentType: job["Employment type"],
        industries: job.Industries,
        jobFunction: job["Job function"],
        seniorityLevel: job["Seniority level"],
        company: job.company,
        companyId: job.company_id,
        context: job.context,
        date: formattedDate,  // ISO-8601 formatted date
        description: job.description,
        education: job.education,
        location: job.location,
        months_experience: experience,
        postId: job.post_id,
        postUrl: job.post_url,
        salHigh: job.sal_high,
        salLow: job.sal_low,
        salary: job.salary,
        title: job.title,
      };
    });

    const newJobs = await prisma.jobs.createMany({
      data: formattedJobs,
    });

    res.status(201).send({
      message: "Jobs created successfully",
      data: newJobs,
    });
  } catch (error) {
    res.status(400).send({
      message: "Error creating jobs: " + error.message,
    });
  }
});

export default router;