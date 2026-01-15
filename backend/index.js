import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import router from "./routes/booksRoute.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello");
});
app.use("/books", router);

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => {
    console.log("App connected to database");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error(err));
