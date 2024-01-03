const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 8000;
const path = require("path");

// routes
const userRoutes = require("./modules/user/user.routes");
const announcementRoutes = require("./modules/announcement/announcement.routes");
const playerRoutes = require("./modules/player/player.routes");
const jobRoutes = require("./modules/jobs/job/job.routes");
const jobApplyRoutes = require("./modules/jobs/jobApply/jobApply.routes");
const observationRoutes = require("./modules/observation/observation.routes");
const paymentRoutes = require("./modules/payment/payment.routes");

// conversations
const chatRoutes = require("./modules/conversations/chat/chat.routes");
const messageRoutes = require("./modules/conversations/message/message.routes");

const app = express();
const http = require("http");
const Server = http.createServer(app);
const socketIo = require("socket.io");

// middleware
app.use(cors());
app.use(express.json({ limit: "500mb" }));
app.use(
  express.urlencoded({ limit: "500mb", extended: true, parameterLimit: 500000 })
);

connectDB();

// routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/announcements", announcementRoutes);
app.use("/api/v1/players", playerRoutes);
app.use("/api/v1/jobs", jobRoutes);
app.use("/api/v1/job-applies", jobApplyRoutes);
app.use("/api/v1/observations", observationRoutes);
app.use("/api/v1/payments", paymentRoutes);



// conversations
app.use("/api/v1/chats", chatRoutes);
app.use("/api/v1/messages", messageRoutes);

// static file serving
// app.use("/api/v1/uploads", express.static(path.join(__dirname, "/")));

//

// -----------------socket server-----------------
// const io = socketIo(Server, {
//   cors: {
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//   },
// });

// let users = [];

// const addUser = (userId, socketId) => {
//   !users.some((user) => user.userId === userId) &&
//     users.push({ userId, socketId });
// };

// const removeUser = (socketId) => {
//   users = users.filter((user) => user.socketId !== socketId);
// };

// const getUser = (userId) => {
//   return users.find((user) => user.userId === userId);
// };

// io.on("connection", (socket) => {
//   console.log("connected. 🟢");

//   //take userId and socketId from user
//   socket.on("addUser", (userId) => {
//     addUser(userId, socket.id);
//     io.emit("getUsers", users);
//   });

//   //send and get message
//   socket.on("sendMessage", ({ senderId }) => {
//     io.emit("getMessage", {
//       senderId,
//     });
//   });

//   //when disconnect
//   socket.on("disconnect", () => {
//     console.log("disconnected! 🔴");
//     removeUser(socket.id);
//     io.emit("getUsers", users);
//   });
// });

// -----------------socket server-----------------

// testing api
app.get("/", (req, res) => {
  res.send("Server is running");
});

Server.listen(PORT, () => {
  console.log(`Server is Running PORT: ${PORT}`);
});
