const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Route to handle order data
router.post("/orderData", async (req, res) => {
  const { order_data, email, order_date } = req.body;
  console.log(order_data);
  // Validate input
  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  if (!Array.isArray(order_data)) {
    return res.status(400).json({ success: false, message: "Order data should be an array" });
  }

  try {
    // Add the order date to the order data if provided
    if (order_date) {
      order_data.unshift({ Order_date: order_date });
    }
 
    // Check if email already exists
    const existingOrder = await Order.findOne({ email });

    if (!existingOrder) {
      // Create new order for the email
      await Order.create({
        email,
        order_data: [order_data],
      });
      return res.status(200).json({ success: true });
    } else {
      // Update existing order data
      await Order.findOneAndUpdate(
        { email },
        { $push: { order_data: { $each: order_data } } },
        { new: true } // Optionally return the updated document
      );
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    console.error("Error handling order data:", error.message);
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
});

// Route to fetch order data
router.post("/myorderData", async (req, res) => {
  try {
    const { email } = req.body;
    // Validate input
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const myOrder = await Order.findOne({ email });

    if (!myOrder) {
      return res.status(404).json({ success: false, message: "Order data not found" });
    }

    res.status(200).json({ success: true, orderData: myOrder });
  } catch (error) {
    console.error("Error fetching order data:", error.message);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
});

module.exports = router;
