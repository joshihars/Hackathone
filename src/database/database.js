const mongoose = require("mongoose");

const configs =  require("../configs/config");

// database connectivity code 
const dbCon = mongoose.connect(configs.config.DB_URL,{
   useNewUrlParser:true,
   useUnifiedTopology:true
})
.then(()=>{
    console.log("db connected");
})
.catch((err)=>{
    console.log(err);
})

module.exports = {dbCon};