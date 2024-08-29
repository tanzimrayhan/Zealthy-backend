import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import "dotenv/config";
import router from "./controllers/apiController.js";

let app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running fine" });
});

app.get("/test-connection", async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.status(200).json({ message: "MongoDB connection successful" });
  } catch (error) {
    res.status(500).json({ message: "Error connecting to MongoDB", error });
  }
});

app.use(router);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3000");
});
