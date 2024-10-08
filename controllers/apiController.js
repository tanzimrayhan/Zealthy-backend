import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import Page from "../models/page.js"; // assuming Page model is in models/Page
import mongoose from "mongoose";
import e from "express";

const router = express.Router();

router.post("/user", async (req, res) => {
  const {
    email,
    password,
    birthday,
    aboutMe,
    streetAddress,
    city,
    state,
    zip,
  } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Invalid email" });
  }

  if (!password || password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
      birthday,
      aboutMe,
      streetAddress,
      city,
      state,
      zip,
    });
    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

router.get("/pages", async (req, res) => {
  try {
    const pages = await Page.find({});
    res.status(200).json(pages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pages", error });
  }
});

router.get("/resetPages", async (req, res) => {
  try {
    let page2 = await Page.findOne({ pageNo: 2 });
    if (page2) {
      page2.componentList = [
        "aboutMe",
        "streetAddress",
        "city",
        "state",
        "zip",
      ];
    } else {
      page2 = new Page({
        pageNo: 2,
        componentList: ["aboutMe", "streetAddress", "city", "state", "zip"],
      });
    }

    await page2.save();
    let page3 = await Page.findOne({ pageNo: 3 });
    if (page3) {
      page3.componentList = ["birthday"];
    } else {
      page3 = new Page({
        pageNo: 3,
        componentList: ["birthday"],
      });
    }
    
    await page3.save();
    res.status(200).json({ message: "Default Layout loaded successfully" , page2, page3});
  } catch (error) {
    res.status(500).json({ message: "Error resetting pages", error });
  }
});

router.post("/pages", async (req, res) => {
  const { pageNo, componentList } = req.body;

  try {
    let page = await Page.findOne({ pageNo });

    if (page) {
      page.componentList = componentList;
    } else {
      page = new Page({
        pageNo,
        componentList,
      });
    }

    await page.save();

    res.status(201).json({ message: "Page layout created successfully", page });
  } catch (error) {
    res.status(500).json({ message: "Error creating page", error });
  }
});

export default router;
