import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const cleanFullName = fullName?.trim();
    const cleanEmail = email?.trim().toLowerCase();
    const cleanPassword = password?.trim();

    if (!cleanFullName || !cleanEmail || !cleanPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (cleanPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const hashedPassword = await hash(cleanPassword, 10);

    const user = await User.create({
      fullName: cleanFullName,
      email: cleanEmail,
      password: hashedPassword,
    });

    const token = createToken(user._id);

    res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Error: ", error);

    res.status(500).json({ message: "Server error while registering user" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const cleanEmail = email?.trim().toLowerCase();
    const cleanPassword = password?.trim();

    if (!cleanEmail || !cleanPassword) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: cleanEmail });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const passwordMatches = await compare(cleanPassword, user.password);
    if (!passwordMatches) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = createToken(user._id);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        heightCm: user.heightCm,
        goal: user.goal,
        notificationsEnabled: user.notificationsEnabled,
        reminderTime: user.reminderTime,
      },
    });
  } catch {
    res.status(500).json({ message: "Server error while logging in" });
  }
};

export { registerUser, loginUser };
