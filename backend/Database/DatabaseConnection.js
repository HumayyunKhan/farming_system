const mongoose = require("mongoose");

// const dbURI = "mongodb+srv://admin:test123@cluster0.krj9fey.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const dbURI = 'mongodb+srv://admin:test123@cluster0.krj9fey.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbURI = 'mongodb+srv://admin:test123@cluster0.krj9fey.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
// const dbURI = "mongodb+srv://admin:adminPassword@farming.kjjo4gd.mongodb.net/RR_Farming";
// const dbURI = "mongodb://127.0.0.1:27017/farming";
 
  
   
mongoose.connect(dbURI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sslValidate: true,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  tlsAllowInvalidCertificates: false, 
  tlsAllowInvalidHostnames: false,
});
const db = mongoose.connection;

db.on("connected", () => {
  console.log(`Mongoose connected`);
});

db.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

db.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

module.exports = db;
