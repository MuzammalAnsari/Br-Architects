

const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    _id: Number,
    firstName: String,
    lastName: String,
    age: Number,
    courses: [String],
    address: {
        street: String,
        city: String,
        state: String,
        zip: String
    }
},
    { collection: "studentInfo", versionKey: false }
)

const studentModel = mongoose.model("studentInfo", studentSchema)

module.exports = studentModel;