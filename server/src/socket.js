import { Server } from "socket.io";
import { createServer } from "http";
import app from "./app.js";

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_APP_URL,
    credentials: true,
    optionsSuccessStatus: 200,
  },
});

export { server, io };
