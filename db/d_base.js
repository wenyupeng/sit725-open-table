require('dotenv').config();
const uri = process.env.MONGODB_URI
const { MongoClient, ServerApiVersion } = require("mongodb");

const aum_db_Name = "Sit725AumBooking";

let _db;

// Create a new MongoClient instance
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connectDB = callback => {
    client.connect()
    .then(client =>{
      _db = client.db(aum_db_Name);
      console.log("Connected to MongoDB");
      callback();
    })  
  .catch(error => {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  })
};

const getDB = () => {
  if (_db) {
    return _db;
  }
  throw "No database found";
};

exports.connectDB = connectDB;
exports.getDB = getDB;