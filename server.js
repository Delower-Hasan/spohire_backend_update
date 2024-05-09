const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const cron = require("node-cron");
const PORT = process.env.PORT || 8000;
const path = require("path");

// routes importss
const userRoutes = require("./modules/user/user.routes");
const announcementRoutes = require("./modules/announcement/announcement.routes");
const playerRoutes = require("./modules/player/player.routes");
const jobRoutes = require("./modules/jobs/job/job.routes");
const jobApplyRoutes = require("./modules/jobs/jobApply/jobApply.routes");
const observationRoutes = require("./modules/observation/observation.routes");
const paymentRoutes = require("./modules/payment/payment.routes");
const notificationRoutes = require("./modules/notification/notification.routes");
const blogRoutes = require("./modules/blog/blog.routes");
const contactRoutes = require("./modules/contact/contact.routes");

// conversations
const chatRoutes = require("./modules/conversations/chat/chat.routes");
const messageRoutes = require("./modules/conversations/message/message.routes");

const app = express();
const http = require("http");
const Server = http.createServer(app);
const socketIo = require("socket.io");
const Job = require("./modules/jobs/job/job.model");
const Player = require("./modules/player/player.model");
const User = require("./modules/user/user.model");
const AnnouncementModel = require("./modules/announcement/announcement.model");
const CouponModal = require("./modules/coupon/coupon.routes");
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
app.use("/api/v1/notification", notificationRoutes);

// static paths
app.use("/api/v1/uploads", express.static(path.join(__dirname, "/")));
app.use(express.static(path.join(__dirname, "dist")));

// conversations
app.use("/api/v1/chats", chatRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/coupons", CouponModal);

// Schedule task to run daily at midnight
cron.schedule("0 0 * * *", async () => {
  const currentDate = new Date();

  await Job.updateMany(
    { expirationDate: { $lt: currentDate } },
    { isActive: false }
  );
  await Player.updateMany(
    { expirationDate: { $lt: currentDate } },
    { isActive: false, subscriptionName: undefined, isSubsCribed: false }
  );
  await User.updateMany(
    { expirationDate: { $lt: currentDate } },
    { isActive: false, subscriptionName: undefined, isSubsCribed: false }
  );
  await AnnouncementModel.updateMany(
    { expirationDate: { $lt: currentDate } },
    { isActive: false, isPaid: false, status: "Not Published" }
  );
});

// static file serving
// app.use("/api/v1/uploads", express.static(path.join(__dirname, "/")));

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
app.get("/api/v1/*", async (req, res) => {
  res.send("Server is running");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

Server.listen(PORT, () => {
  console.log(`Server is Running PORT: ${PORT}`);
});
