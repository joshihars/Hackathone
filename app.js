const express = require("express");
const configs = require("./src/configs/config");
const Router = require("./src/router/adminRouter");
const path = require("path");

const mongodbCon = require("./src/database/database");

const app = express();

mongodbCon ;  // function  for mongodb connectivity code 
app.use(express.json());

// for getting router
app.use("/", Router);

app.get("/home",(req,res)=>{
    res.send("this is home page").status(200);
 })

// for listening port 
app.listen(configs.config.PORT,()=>{
   console.log("app is listening on port ", configs.config.PORT);
})
