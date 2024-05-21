const express = require('express');
const addCourse = express.Router();
const multer = require("multer");
const { courseModel } = require('./modal/courses_add');
// const { courseModel } = require("../upload");

// Storage configuration
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const filenam = uniqueSuffix + '-' + file.originalname;
        cb(null, filenam);
    }
});

var upload = multer({ storage: storage }); // Middleware for file upload

require("dotenv/config");

addCourse.post('/addCourse', upload.single('file'), async (req, res) => {
    try {
        const { name, description, category, price } = req.body;
        const image = req.file.path; // Path to the uploaded image

        // Create new course with the received data
        const newCourse = new courseModel({ name, description, category, price, image });
        await newCourse.save();

        res.status(201).json({
            message: "Course added successfully",
            data: newCourse
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error",
            data: err.message
        });
    }
});

module.exports = { addCourse };
