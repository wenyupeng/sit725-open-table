const { getDB } = require("../../db/d_base");
const bcrypt = require("bcrypt");
const { ObjectId } = require('mongodb');

class User {
  static async register(userData) {
    const db = getDB();

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt); // Hash the password

    const sanitizedUserData = {
        _id: new ObjectId(),
      username: userData.username,
      phone: userData.phone,
      email: userData.email,
      password: hashedPassword,
      isActive: true,           
      dateCreated: new Date(),
      dateModified: new Date(),
      role: userData.role || "user", // Default role
    };

    const result = await db.collection("users").insertOne(sanitizedUserData);
    console.log("register result", result);
    // return result.insertedId;
  }

  static async findByEmail(email) {
    const db = getDB();
    return await db.collection("users").findOne({ email });
  }

  static async findByPhone(phone) {
    const db = getDB();
    return await db.collection("users").findOne({ phone });
  }
  static async findUserById(userId) {    
    const db = getDB();
    return await db.collection('users').findOne({ _id: new ObjectId(userId)});  
}

  static async login(email, password) {
    const db = getDB();
    const user = await db.collection("users").findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      console.log("login User:",user._id);
      return user._id; // Return user object if login is successful
    }
    throw new Error("Invalid email or password");
  }
  
}

module.exports = User;