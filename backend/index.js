const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectToDB = require("./database");

const app = express();
const PORT = process.env.PORT || 8000;

/* ✅ CORS FIX — allow frontend + local dev */
app.use(cors({
  origin: "*", // allow all origins (best for deployment testing)
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

connectToDB();

app.get("/", (req, res) => {
  res.send("Hello User!");
});

app.use("/api/v3.2/auth", require("./router/auth.router"));
app.use("/api/v3.2/note", require("./router/note.router"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});