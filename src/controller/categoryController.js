const categoryModel = require("../model/categoryModel");

// This api is for creating category
const createCategory = async(req,res)=>{
    let categoryName = req.body.categoryName ? req.body.categoryName :'';
    let categoryDescription = req.body.categoryDescription ? req.body.categoryDescription:'';
    let category_id = req.body.category_id ?req.body.category_id:'';

    try {
       // checking for unique category
       let foundcategory = await categoryModel.findOne({categoryName:categoryName});
       if(foundcategory){
           return res.status(409).send({message:"category already exist"});
       }
        // create category data
        let data = await categoryModel.create({
            categoryName:categoryName,
            categoryDescription:categoryDescription,
            category_id:category_id,
        })
        return res.status(200).send({data:data,message:"Add category successful",status:200})
    } catch (error) {
        return res.status(500).send({message:error.message,status:500})
    }
    
   
}

// This api is for get all category
const getCategory = async (req,res)=>{
    try {
        let data = await categoryModel.find()

        if(data.length===0){
            return res.status(404).send({message:"No category found",status:404})
        }
        else{
            return res.status(200).send({data:data,message:"Success",status:200})
        }
    } catch (error) {
        return res.status(500).send({message:error.message,status:500})
    }
}

// This api is for update category data 
const updateCategoryData = async (req,res)=>{
    let id =  req.params.id;
    let categoryName = req.body.categoryName ? req.body.categoryName :'';
    let categoryDescription = req.body.categoryDescription ? req.body.categoryDescription:'';
    let categoryStatus = req.body.categoryStatus ? req.body.categoryStatus:'';
   
    try {
        
         let getData =await categoryModel.findOne({_id:id});
         // if category name exist with same id so unique category name should not work
         if(getData.categoryName === categoryName) {

          }
         else{
            // checking for unique category 
            let foundcategory = await categoryModel.findOne({categoryName:categoryName});
            if(foundcategory){
                return res.status(409).send({message:"category already exist"});
            }

         }
      // update category data
        let data = await categoryModel.findOneAndUpdate({_id:id},{
         $set:   {
            categoryName:categoryName,
            categoryDescription:categoryDescription,
            categoryStatus:categoryStatus
        }
      
        },{new:true})
        return res.status(200).send({data:data,message:"Add category successful",status:200})
    } catch (error) {
        return res.status(500).send({message:error.message,status:500})
    }
    
}

// This api is for delete category 
const deleteCategory = async (req,res)=>{

    let id = req.params.id;

    try {
        // delete category 
        let data = await categoryModel.findOneAndDelete({_id:id})

        return res.status(200).send({message:"Category deleted successfully",status:200})
        
    } catch (error) {
        return res.status(500).send({message:error.message,status:500})
    }
}

module.exports = {createCategory, getCategory,updateCategoryData,deleteCategory};