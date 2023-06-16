const express = require("express");
const router = express.Router();

const adminApi = require("../controller/adminController");
const category = require("../controller/categoryController");
const product = require("../controller/productController")
const forgotMail = require("../controller/forgotPasswordMail")

const adminAuth = require("../middleware/adminAuth");

const middleware = require("../middleware/upload");

// api for create admin
router.post("/createAdmin" , adminApi.createAdmin);

// api for login admin
router.post("/loginAdmin" , adminApi.loginAdmin);

//api for create category
router.post("/createCategory" , [adminAuth.adminAuth],category.createCategory);

//api for get all category data
router.get("/getCategory" , [adminAuth.adminAuth], category.getCategory);

//api for updatecategory data
router.put("/updateCategoryData/:id" ,[adminAuth.adminAuth], category.updateCategoryData);

//api for delete category 
router.delete("/deleteCategory/:id" ,[adminAuth.adminAuth], category.deleteCategory);

//api for getting forgotpassword link on email
router.post("/forgotPasswordLink" , [adminAuth.adminAuth] , forgotMail.sendMail);

// api for reset password 
router.put("/resetPassword/:email", [adminAuth.adminAuth] , forgotMail.resetPassword)

// api for create Product 
router.post("/createProduct" , [adminAuth.adminAuth],middleware.upload.single("image"), product.createProduct);

// api for get all product data
router.get("/getProduct" , [adminAuth.adminAuth], product.getProduct);

// api for delete product 
router.delete("/deleteProduct/:id" ,[adminAuth.adminAuth], product.deleteProduct);

// api for update product data
router.put("/updateProductData/:id" ,[adminAuth.adminAuth],middleware.upload.single("image"), product.updateProductData);



module.exports =  router 