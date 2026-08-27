const User = require('../models/User'); // Path to your User model

// 1. UPDATE CONTROLLER (To edit user details)
const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        res.status(200).json({ message: "User updated successfully!", updatedUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. DELETE CONTROLLER (To remove a user)
const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Exporting controllers for use in routes
module.exports = {
    updateUser,
    deleteUser
};
