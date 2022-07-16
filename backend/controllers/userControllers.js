import asyncHandler from "express-async-handler";
import database from "../configs/database.js";
import { User } from "../configs/enities/user-entity.js";
import { hashPass, verifyPass } from "../configs/encryption.js";
import jwt from "jsonwebtoken";


export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const [rows] = await database.query(
    `SELECT * FROM ${User.tableName} WHERE ${User.userName} = '${username}';`
  );
  const user = rows[0];
  console.log(user)

  if (user && (await verifyPass(user[User.password], password))) {
    res.json({
      userId: user[User.userID],
      name: user[User.userName],
      email: user[User.email],
      token: generateToken(user[User.userID]),
    });
  } else {
    res.status(401);
    throw Error("Invalid email and password");
  }
});


export const signup = asyncHandler(async (req, res) => {
  const { name, email, dateOfBirth, gender, password } = req.body;

  const [isEmailUsed] = await database.query(
    `SELECT ${User.email} FROM ${User.tableName} WHERE ${User.email} = '${email}';`
  );
  const [isUserNameUsed] = await database.query(
    `SELECT ${User.userName} FROM ${User.tableName} WHERE ${User.userName} = '${name}';`
  );
  if (!isEmailUsed.length && !isUserNameUsed.length) {
    const [rows] = await database.query(
      `INSERT INTO ${User.tableName} (${User.email}, ${User.password
      }, ${User.userName}, ${User.dob}, ${User.gender}) 
       VALUES ('${email}', '${await hashPass(
        password
      )}', '${name}','${dateOfBirth}','${gender}');`
    );

    res.json({
      userId: rows.insertId,
      name,
      email,
      token: generateToken(rows.insertId),
    });
  } else {
    res.status(400);
    throw new Error("Email/username already in use");
  }
});


export const getProfile = asyncHandler(async (req, res) => {
  const user = req.user;

  const [rows] = await database.query(
    `SELECT * FROM ${User.tableName} 
     WHERE ${User.userID}='${user[User.userID]}';`
  );

  const userInfo = rows[0];

  if (userInfo) {
    res.json({
      userId: userInfo[User.userID],
      name: userInfo[User.userName],
      email: userInfo[User.email],
      dateOfBirth: userInfo[User.dob],
      gender: userInfo[User.gender],
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});


export const updateProfile = asyncHandler(async (req, res) => {
  console.log(req.body);
  const userId = req.user[User.userID];

  const { name, email, dateOfBirth, gender } = req.body;

  const [results] = await database.query(
    `SELECT * FROM ${User.tableName} WHERE ${User.userID} = '${userId}';`
  );

  const user = results[0];
  // const passwordCorrect = await verifyPass(
  //   user[User.password],
  //   password
  // );

  if (user) {
    const [isEmailUsed] = await database.query(
      `SELECT ${User.email} FROM ${User.tableName} WHERE ${User.email} = '${email}';`
    );
    if (isEmailUsed.length) {
      const updatedName = name || user[User.userName];
      const updatedEmail = email || user[User.email];
      const updatedGender = gender || user[User.gender];
      const updatedDOB = dateOfBirth || user[User.dob];
      console.log(updatedEmail, updatedName, updatedDOB);
      const [rows] = await database.query(
        `UPDATE ${User.tableName}
         SET ${User.email}='${updatedEmail}', ${User.userName}='${updatedName}', ${User.dob}='${updatedDOB}', ${User.gender}='${updatedGender}'
         WHERE ${User.userID} = '${userId}';`
      );

      res.json({
        userId,
        name: updatedName,
        email: updatedEmail,
        gender: updatedGender,
        dateOfBirth: updatedDOB,
      });
    } else {
      res.status(401);
      throw new Error("Email Already in use");
    }
  }
});


export const updatePassword = asyncHandler(async (req, res) => {
  const userId = req.user[User.userID];
  const { newPassword, oldPassword } = req.body;

  const [results] = await database.query(
    `SELECT * FROM ${User.tableName} WHERE ${User.userID} = '${userId}';`
  );

  const user = results[0];

  const passwordCorrect = await verifyPass(
    user[User.password],
    oldPassword
  );

  if (passwordCorrect) {
    const [rows] = await database.query(`UPDATE ${User.tableName}
    SET ${User.password}='${await hashPass(newPassword)}'
    WHERE ${User.userID}='${userId}';`);

    console.log(rows[0]);

    res.send("Password updated");
  } else {
    res.status(401);
    throw new Error("Wrong password");
  }
});


export const getAllUsers = asyncHandler(async (req, res) => {
  const [rows] =
    await database.query(`SELECT ${User.userID},${User.userName},${User.email},${User.dob},${User.gender} 
  FROM ${User.tableName};`);

  const userList = rows;
  res.json(userList);
});
export const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  const [rows] = await database.query(
    `SELECT * FROM ${User.tableName} 
     WHERE ${User.userID}='${userId}';`
  );
  const userInfo = rows[0];

  if (userInfo) {
    res.json({
      name: userInfo[User.userName],
      email: userInfo[User.email],
      dateOfBirth: userInfo[User.dob],
      gender: userInfo[User.gender],
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});



const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "5d" });
};
