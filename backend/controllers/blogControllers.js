import asyncHandler from "express-async-handler";
import database from "../configs/database.js";
import { User } from "../configs/enities/user-entity.js";
import { Blog } from "../configs/enities/blog-entity.js";
import NodeCache from "node-cache";

const cache = new NodeCache();


export const getOwnBlogs = asyncHandler(async (req, res) => {
  const userId = req.user[User.userID];

  const [rows] = await database.query(
    `SELECT * FROM ${Blog.tableName} WHERE ${Blog.userID}='${userId}'`
  );

  const blogList = rows;

  res.json(blogList);
});


export const getBlogsByUser = asyncHandler(async (req, res) => {
  const userId = req.params?.userId;

  const [rows] = await database.query(
    `SELECT * FROM ${User.tableName} 
     WHERE ${User.userID}='${userId}';`
  );
  const userExists = rows[0];
  if (userExists) {
    const [results] = await database.query(
      `SELECT * FROM ${Blog.tableName} WHERE ${Blog.userID}='${userId}'`
    );
    const blogList = results;

    res.json(blogList);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});


export const getAllBlogs = asyncHandler(async (req, res) => {
  const blogCache = cache.get("blogCache");

  if (blogCache === undefined) {
    const [rows] = await database.query(`SELECT * FROM ${Blog.tableName};`);
    const blogList = rows;
    cache.set("blogCache", blogList, 15);
  }

  res.json(cache.get("blogCache"));
});

export const getBlogById = asyncHandler(async (req, res) => {
  const blogId = req.params.blogId;
  const [rows] = await database.query(`SELECT blogId, title, description, dateCreated, ${User.tableName}.userId, name FROM ${Blog.tableName}
  JOIN ${User.tableName} on ${User.tableName}.${User.userID}=${Blog.tableName}.${Blog.userID} WHERE ${Blog.blogID}='${blogId}';`);
  if (rows[0]) {
    res.json(rows[0]);
  } else {
    res.status(404)
    throw new Error("Blog Not Found!");
  }
})
export const createBlog = asyncHandler(async (req, res) => {

  const { title, description } = req.body;
  const userId = req.user[User.userID];

  try {
    const [rows] = await database.query(`INSERT INTO ${Blog.tableName}
    (${Blog.title},${Blog.description},${Blog.userID})
    VALUES ('${title}',"${description}",'${userId}');
    `);
    res.json({
      blogId: rows.insertId,
      title,
      description,
      dateCreated: new Date(),
      userId,
    });

  } catch (error) {
    console.log(error)
  }
});

export const updateBlog = asyncHandler(async (req, res) => {
  const { blogId, title, description } = req.body;
  const userId = req.user[User.userID];

  const [rows] = await database.query(
    `SELECT * FROM ${Blog.tableName} WHERE ${Blog.blogID}='${blogId}'`
  );

  const blog = rows[0];

  const isAuthor = blog[Blog.userID] == userId;

  if (blog && isAuthor) {
    const updatedTitle = title || blog[Blog.title];
    const updatedDesc = description || blog[Blog.description];

    console.log(userId, blogId, updatedTitle, updatedDesc);

    const [result] = await database.query(
      `UPDATE ${Blog.tableName}
      SET ${Blog.title}='${updatedTitle}', ${Blog.description}='${updatedDesc}'
      WHERE ${Blog.blogID}=${blogId} AND ${Blog.userID}=${userId};`
    );

    res.json({
      blogId,
      title: updatedTitle,
      description: updatedDesc,
      dateCreated: blog[Blog.dateCreated],
      userId,
    });
  } else if (!blog) {
    res.status(401);
    throw new Error("Blog does not exist");
  } else {
    res.status(403);
    throw new Error("Unauthorized. Not the author of the blog");
  }
});


export const deleteBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const userId = req.user[User.userID];

  const [rows] = await database.query(
    `SELECT * FROM ${Blog.tableName} WHERE ${Blog.blogID}='${blogId}'`
  );

  const blog = rows[0];

  const isAuthor = blog[Blog.userID] == userId;

  if (blog && isAuthor) {
    const [result] = await database.query(
      `DELETE FROM ${Blog.tableName} WHERE ${Blog.blogID}=${blogId} AND ${Blog.userID}=${userId};`
    );

    res.json({ blogId, message: "Blog deleted" });
  } else if (!blog) {
    res.status(401);
    throw new Error("Blog does not exist");
  } else {
    res.status(403);
    throw new Error("Unauthorized. Not the author of the blog");
  }
});
