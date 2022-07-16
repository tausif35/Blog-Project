import bcryptjs from "bcryptjs";

export const hashPass = async (pass) => {
  try {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(pass, salt);
  } catch (error) {
    console.log(error);
    throw new Error("Hashing Failed");
  }
};

export const verifyPass = async (hashedPass, pass) => {
  try {

    return await bcryptjs.compare(pass, hashedPass);
  } catch (error) {
    console.log(error);
    throw new Error("Password verification failed!");
  }
};
