const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const compareRoutes = require("./routes/compareRoutes");
const chatRoutes = require("./routes/chatRoutes");
const historyRoutes = require("./routes/historyRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/compare", compareRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/history", historyRoutes);

app.get("/", (req, res) => {
    res.send("server running");
});

app.listen(process.env.PORT || 5000, () => {
    console.log("server started");
});