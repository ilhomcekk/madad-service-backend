const mongoose = require("mongoose");
const url = "mongodb+srv://Ilhom:01q765oa@cluster0.cl18r9r.mongodb.net/";

// connect to mongodb
async function dbConnect() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
    });
    console.log("COnnected to MongoDB");
  } catch (error) {
    console.log(error);
  }
}

module.exports = dbConnect;
