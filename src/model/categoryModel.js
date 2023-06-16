const mongoose = require("mongoose");


const categorySchema = new mongoose.Schema({
  
    categoryName:{
        type:String,
        required:[true,"category name is required"]
    },
    categoryDescription:{
        type:String,
        required:[true,"category description is required"]
    },
    categoryStatus:{
        type:Boolean,
        default: true
    },

      

    category_id:{
        type:Number,
    }
  
})



module.exports = mongoose.model("category", categorySchema);
