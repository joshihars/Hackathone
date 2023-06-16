const adminModel = require("../model/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendResetEmail = require("./forgotPasswordMail");
const configs = require("../configs/config");

// This api is for creating admin
const createAdmin = async(req,res)=>{
    try {
        let {email,password} = req.body;

        const foundAdmin = await adminModel.findOne({email:email});

        if(foundAdmin){
            return res.status(400).send({msg:"admin already registered"});
        }
        else {
            const saltRound = 10;
            const hashedPassword = await bcrypt.hash(password , saltRound)
            const data = await adminModel.create({
                   email:email,
                   password:hashedPassword,
            })

            return res.status(200).send({data:data, msg:"admin created"});
        }

    } catch (error) {
        return res.status(400).send(error);
    }
}

// This api  is for login Admin using JWT and generating access token 
const loginAdmin = async(req,res)=>{

    try {
        let {email,password} = req.body;
   
        const foundAdmin = await adminModel.findOne({email:email});
     
        if(!foundAdmin){
           return res.status(400).send({msg:"email not registered"});
        }
        else{
         const match = await bcrypt.compare(password, foundAdmin.password);
     
         if(match){
            // generate jwt 
             const generateToken = jwt.sign({id:foundAdmin._id},configs.config.SECRET_KEY );
             return res.status(200).send({
                 token:generateToken,
                 data:foundAdmin,
             })

         }
         else{
             return res.status(400).send({msg:"password not matched"});
         }
        }
    } catch (error) {
        return res.status(400).send({msg:error});
    }

   
}

module.exports = {createAdmin , loginAdmin};