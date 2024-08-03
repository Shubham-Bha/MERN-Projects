const express = require("express");
const router = express.Router();

router.post('/foodData', (req, res) => {
    try {
        // Ensure that global variables are defined before using them
        if (!global.food_items || !global.foodCategory) {
            return res.status(500).json({ success: false, message: "Data not available" });
        }

        console.log(global.food_items, global.foodCategory);
        res.json({
            success: true,
            data: {
                foodItems: global.food_items,
                foodCategories: global.foodCategory
            }
        });

    } catch (error) {
        console.error("An error occurred:", error.message); // Provide a descriptive error message
        res.status(500).json({ success: false, message: "Server error" }); // Use proper status code
    }
});

module.exports = router;
