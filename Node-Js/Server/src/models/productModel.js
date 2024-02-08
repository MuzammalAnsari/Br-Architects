const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    price: Number,
    category: String,
    specifications: {
        weight: String,
        dimensions: {
            width: Number,
            height: Number,
            depth: Number
        }
    },
    tags: [String]
},
    { collection: "productInfo", versionKey: false }
)

const productModel = mongoose.model("productInfo", productSchema)


module.exports = productModel;


