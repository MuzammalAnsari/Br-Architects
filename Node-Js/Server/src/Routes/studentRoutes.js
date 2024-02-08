const express = require("express");
const router = express.Router();
const Students = require("../models/studentModel");

// Read student data
router.get("/students", async (req, res) => {
    try {
        const userData = await Students.find();
        res.status(200).json(userData); // 200 OK for success
    } catch (error) {
        res.status(500).json({ error: error.message }); // 500 Internal Server Error for errors
    }
});

// Create student data
router.post("/createStudent", async (req, res) => {
    try {
        const studentData = new Students({
            _id: req.body._id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            courses: req.body.courses,
            address: req.body.address
        });

        const data = await studentData.save();
        res.status(201).json(data); // 201 Created for success
    } catch (error) {
        res.status(400).json({ error: error.message }); // 400 Bad Request for validation errors
    }
});

router.delete("/deleteStudent/:id", async (req, res) => {
    try {
        const stdId = req.params.id;
        const delStd = await Students.findByIdAndDelete(stdId);

        if (!delStd) {
            return res.status(404).json({ message: "Student not found!" }); // 404 Not Found
        }

        res.status(200).json({ message: "Student deleted successfully" }); // 200 OK for success
    } catch (error) {
        res.status(500).json({ error: error.message }); // 500 Internal Server Error for errors
    }
});

router.put("/updateStudent/:id", async (req, res) => {
    try {
        const stdId = req.params.id;
        const stdToBeUpdated = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            courses: req.body.courses,
            address: req.body.address
        };

        const updatedStudent = await Students.findByIdAndUpdate(stdId, stdToBeUpdated, { new: true });
        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found!" }); // 404 Not Found
        }

        res.status(200).json({ message: "Student updated successfully" }); // 200 OK for success
    } catch (error) {
        res.status(500).json({ error: error.message }); // 500 Internal Server Error for errors
    }
});

module.exports = router;
