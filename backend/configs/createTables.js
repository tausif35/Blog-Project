import database from "./database.js";
import { User } from "./enities/user-entity.js";
import { Blog } from "./enities/blog-entity.js";

const createUserTable = async () => {
  return await database.query(`CREATE TABLE IF NOT EXISTS ${User.tableName} 
  (
    ${User.userID} INT PRIMARY KEY AUTO_INCREMENT, 
    ${User.userName} VARCHAR(30), 
    ${User.email} VARCHAR(100), 
    ${User.password} VARCHAR(250),
    ${User.dob} DATE,
    ${User.gender} VARCHAR(15)
    );`);
};

const createBlogTable = async () => {
  return await database.query(`CREATE TABLE IF NOT EXISTS ${Blog.tableName} 
  (
    ${Blog.blogID} INT PRIMARY KEY AUTO_INCREMENT, 
    ${Blog.title} TEXT, 
    ${Blog.description} TEXT, 
    ${Blog.dateCreated} DATETIME DEFAULT CURRENT_TIMESTAMP,
    ${Blog.userID} INT,
    FOREIGN KEY (${Blog.userID}) REFERENCES ${User.tableName}(${User.userID}));`);
};

const createTables = async () => {
  try {
    await createUserTable();
    await createBlogTable();
  } catch (error) {
    console.log(error);
  }
};

export default createTables;
