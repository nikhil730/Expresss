import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/user", userRoutes);

//const dbname = "Kicker_db";
//const connection_url =
//  "mongodb+srv://nikhil:.eebuL5tURPiNtx@cluster0.8jqmdrx.mongodb.net/" +
//  dbname +
//  "";
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send(`server running at ${PORT}`);
});

mongoose
  .connect(process.env.connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server runing on port: ${PORT} , Connected to Mongodb`)
    );
  })
  .catch((err) => console.log(err));
