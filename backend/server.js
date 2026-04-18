import express, { json } from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import connectDatabase from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import workoutRoutes from "./routes/workoutRoutes.js";
import nutritionRoutes from "./routes/nutritionRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import mealTypeRoutes from "./routes/mealTypeRoutes.js";
import exerciseRoutes from "./routes/exerciseRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import "dotenv/config";
import { Server } from "socket.io";
import { createServer } from "node:http";

connectDatabase();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
  connectionStateRecovery: {},
});

app.set("io", io);

io.use((socket, next) => {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) {
      return next(new Error("Authentication token missing"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (err) {
    next(new Error("Invalid token"));
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id, socket.user);
  socket.join(`user:${socket.user.id}`);
  socket.join(socket.user.id);

  socket.on("message:send", (payload, callback) => {
    try {
      const messageData = {
        id: Date.now().toString(),
        text: payload.text,
        senderId: socket.user.id,
        createdAt: new Date().toISOString(),
      };

      io.to(`user:${socket.user.id}`).emit("message:new", messageData);
      callback?.({
        ok: true,
        message: "Message delivered",
        data: messageData,
      });
    } catch (error) {
      callback?.({
        ok: false,
        message: "Failed to send message",
      });
    }
  });

  socket.on("join:room", (roomId) => {
    socket.join(roomId);
    console.log(`${socket.id} joined room ${roomId}`);
  });

  socket.on("room:message", ({ roomId, text }) => {
    socket.to(roomId).emit("room:message:new", {
      roomId,
      text,
      senderId: socket.user.id,
      createdAt: new Date().toISOString(),
    });
  });

  socket.on("disconnect", (reason) => {
    console.log("Disconnected:", socket.id, reason);
  });
});

app.get("/", (req, res) => {
  res.json({ message: "Fitness Tracker API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/nutrition", nutritionRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/meal-types", mealTypeRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
