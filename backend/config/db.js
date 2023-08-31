const mongoose = require('mongoose')

const connectDB = async () => {
  try {

    // Set the strictQuery option to false to prepare for Mongoose 7 default change
    mongoose.set('strictQuery', false);

    const conn = await mongoose.connect("mongodb+srv://dalaib3:content123@content-editor.astrjhi.mongodb.net/")

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB
