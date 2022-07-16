import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogsByUser,
  getOwnBlogs,
  updateBlog,
  deleteBlog,
  getBlogById
} from "../controllers/blogControllers.js";
import { check } from "express-validator";
import { validationCheck } from "../middlewares/validator.js";
import { protect } from "../middlewares/authMiddleware.js";

const blogRouter = express.Router();

blogRouter.use(protect);

blogRouter.route("/").get(getAllBlogs);

blogRouter
  .route("/write")
  .post(
    [
      check("title", "Title can not be empty.").notEmpty(),
      check("description", "Description can not be empty.").notEmpty(),
    ],
    validationCheck,
    createBlog
  );

blogRouter
  .route("/edit")
  .patch(
    [
      check("blogId", "Blog ID required.").notEmpty(),
      check("title", "Title can not be empty.")
        .optional({ nullable: true })
        .notEmpty(),
      check("description", "Description can not be empty.")
        .optional({ nullable: true })
        .notEmpty(),
    ],
    validationCheck,
    updateBlog
  );

blogRouter
  .route("/delete/:blogId")
  .delete(
    // [check("blogId", "Blog ID required.").notEmpty()],
    validationCheck,
    deleteBlog
  );

blogRouter.route("/personalblogs").get(getOwnBlogs);

blogRouter.route("/user/:userId").get(getBlogsByUser);

blogRouter.route("/blog/:blogId").get(getBlogById);

export default blogRouter;
