// const express = require('express'); // CommonJS
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import ENV_VARS from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import tvRoutes from "./routes/tvRoutes.js";
import cookieParser from "cookie-parser";
import { protectRoutes } from "./middleware/protectRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import path from "path";

const app = express();

const __dirname = path.resolve();

const PORT = ENV_VARS.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoutes, movieRoutes);
app.use("/api/v1/tv", protectRoutes, tvRoutes);
app.use("/api/v1/search", protectRoutes, searchRoutes);

if (ENV_VARS.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server started at http://localhost:" + PORT);
  connectDB();
});
