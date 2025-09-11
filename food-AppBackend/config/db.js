var mongoose = require("mongoose");

//fuction for mongo database connection
var connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`connected to database ${mongoose.connection.host}`);
  } catch (error) {
    console.log("DB error", error);
  }
};

module.exports = connectDb;
