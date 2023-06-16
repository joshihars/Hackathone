const productModel = require("../model/productModel");
const upload = require("../middleware/upload");

// This api is for create product 
const createProduct = async (req, res) => {
    let productName = req.body.productName ? req.body.productName : '';
    let packSize = req.body.packSize ? req.body.packSize : '';
    let MRP = req.body.MRP ? req.body.MRP : '';
    let category = req.body.category ? req.body.category : '';

    try {
        // checking for unique product name 
        let foundProduct = await productModel.findOne({ productName: productName });
        if (foundProduct) {
            return res.status(409).send({ message: "product already exist" });
        }
        // for declaring image path
        let path = req.file.path;

        // create product data
        let data = await productModel.create({
            productName: productName,
            packSize: packSize,
            MRP: MRP,
            category: category,
            image: path,
        })
        return res.status(200).send({ data: data, message: "product added successfully", status: 200 })
    } catch (error) {
        return res.status(500).send({ message: error.message, status: 500 })
    }
}

// this api is for get all product
const getProduct = async (req, res) => {
    try {
        // get all product data
        let data = await productModel.find()
 
        if (data.length === 0) {
            return res.status(404).send({ message: "No product found", status: 404 })
        }
        else {
            return res.status(200).send({ data: data, message: "Success", status: 200 })
        }
    } catch (error) {
        return res.status(500).send({ message: error.message, status: 500 })
    }
}

// THis api is for updating procut data
const updateProductData = async (req, res) => {
    let id = req.params.id;
    let productName = req.body.productName;
    let packSize = req.body.packSize;
    let MRP = req.body.MRP;
    let category = req.body.category;
    try {
        let getData = await productModel.findOne({ _id: id });
          // if product name exist with same id so unique product name should not work
        if (getData.productName === productName) {

        }
        else {
            // checking for unique product name 
            let foundProduct = await productModel.findOne({ productName: productName });
            if (foundProduct) {
                return res.status(409).send({ message: "product already exist" });
            }

        }

        let imageData = await productModel.findOne({ _id: id });
        
        // if we are not updating image than previous image would be shown .
        if (req.file === null || req.file === '' || req.file === undefined) {
            path = imageData.image;
        }
        else {
            // declare image path for updating image 
            path = req.file.path;

        }

        // update product data
        let data = await productModel.findOneAndUpdate({ _id: id }, {
            $set:
            {
                productName: productName,
                packSize: packSize,
                MRP: MRP,
                category: category,
                image: path
            }
        }, { new: true })

          return res.status(200).send({ data: data, message: "Success", status: 200 })
    }
    catch (error) {
        return res.status(500).send({ message: error.message, "status": 500 });

    }
}

// this api is for deleting product 
const deleteProduct = async (req, res) => {
    try {
        let id = req.params.id;
        // product deletion 
        let data = await productModel.findOneAndDelete({ _id: id })

        return res.status(200).send({ message: "Product deleted successfully", status: 200 })

    } catch (error) {
        return res.status(500).send({ message: error.message, status: 500 })
    }
}

module.exports = { createProduct, getProduct, updateProductData, deleteProduct }