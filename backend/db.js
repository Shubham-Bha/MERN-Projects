require('dotenv').config();
const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI;

const mongoDb = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");

    // Fetch data from collections
    const foodItems = await mongoose.connection.db.collection("food_items").find({}).toArray();
    const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();

    // Set global variables
    // Consider alternative methods for managing shared data in production
    global.food_items = foodItems;
    global.foodCategory = foodCategory;

    console.log('Food items and categories fetched successfully');
  } catch (err) {
    console.error("Error connecting to MongoDB or fetching data:", err);
  }
};

module.exports = mongoDb;

// Sample invocation for local testing (remove or adjust for production)
(async () => {
  await mongoDb();
  // Optional: Delay for demonstration purposes
  setTimeout(() => {
    console.log('Check if data is available after fetching:', global.food_items);
  }, 1000);
})();
