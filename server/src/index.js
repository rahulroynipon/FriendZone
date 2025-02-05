import "./config/configuration.js";
import connectDB from "./config/DB.config.js";
import app from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../public")));

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_APP_URL,
    credentials: true,
    optionsSuccessStatus: 200,
  },
});

connectDB()
  .then(() => {
    const port = process.env.PORT || 3000;

    app.on("error", () => {
      console.log("Connection failed");
    });

    server.listen(port, () => {
      console.log("The portal hosted at port:", `http://localhost:${port}`);
    });

    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });
  })
  .catch((error) => {
    console.log("MONGODB connection is failed", error);
  });
