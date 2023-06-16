const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:[true,"product name is required"]
    },
    packSize:{
        type:String,
        required:[true,"pack size is required"]
    },
    category:{
        type:String,
        ref: "category",
        required: true
    },
    MRP:{
        type:String,
        required:[true,"Product MRP is required"]
    },
    image:{
        type:String,
        required:[true,"product image  is required"]
    },
    productStatus:{
        type:Boolean,
        default: true
    },
})
module.exports = mongoose.model("product", productSchema);