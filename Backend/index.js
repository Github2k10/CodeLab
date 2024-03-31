const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

app.get("/", (req, res) => {
  res.send("A message from server...");
});

io.on("connection", (socket) => {
  console.log("A new user connected, user ID: ", socket.id);

  socket.on("message", (msg) => {
    if (msg) {
      socket.broadcast.emit("message", msg);
    }
  });

  socket.on("code", (code) => {
    if (code) {
      socket.broadcast.emit("code", code);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected, user ID: ", socket.id);
  });
});

server.listen("3000", () => {
  console.log("Server started at http://localhost:3000");
});
