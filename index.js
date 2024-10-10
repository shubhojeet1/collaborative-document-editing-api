const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const documentRoutes = require("./routes/documentRoutes");
const authRoutes = require('./routes/authRoutes');
const http = require("http");
const { Server } = require("socket.io");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use("/api/documents", documentRoutes);


app.use(errorHandler);

const server = http.createServer(app);

const io = new Server(server);

app.set("io", io);

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

server.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});
