const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const users = {}; // In-memory user store
const messages = {}; // Store messages by user

// Login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = mockUsers.find((u) => u.username === username);

  if (user && bcrypt.compareSync(password, user.password)) {
    users[username] = { socket: null };
    res.status(200).json({ username });
  } else {
    res.status(401).send("Invalid credentials");
  }
});

// WebSocket connection handling
io.on("connection", (socket) => {
  console.log("New connection:", socket.id);

  socket.on("register", (username) => {
    users[username].socket = socket.id;
    socket.username = username;
    if (messages[username]) {
      messages[username].forEach((message) => {
        socket.emit("message", message);
      });
      delete messages[username];
    }
  });

  socket.on("message", ({ to, message }) => {
    const from = socket.username;
    if (users[to] && users[to].socket) {
      io.to(users[to].socket).emit("message", { from, message });
      io.to(socket.id).emit("message", { from, message });
    } else {
      if (!messages[to]) messages[to] = [];
      messages[to].push({ from, message });
    }
  });

  socket.on("disconnect", () => {
    if (socket.username) {
      users[socket.username].socket = null;
    }
    console.log("User disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("Server running in port 5000");
});
