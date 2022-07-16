import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import createTables from "./configs/createTables.js";
import userRouter from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

const app = express();
const server = http.createServer(app);
dotenv.config();
createTables();
app.use(cors());
app.use(express.json());
app.use(express.static("./public/uploads"));
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/users", userRouter);
app.use("/blogs", blogRouter);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.APP_PORT || 3000;

server.listen(
  PORT,
  console.log(`Server started in ${process.env.NODE_ENV} mode on port: ${PORT}`)
);
