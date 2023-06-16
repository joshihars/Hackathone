const jwt = require("jsonwebtoken");
const configs = require("../configs/config")

// for verifying accesstoken for authorizaton of admin
const adminAuth = (req,res,next)=>{ 

    try {

    let token = req.headers['access-token'];
    if(!token){
        return res.status(400).send({msg:"No token provided"});
    }

    jwt.verify(token,configs.config.SECRET_KEY,(err , decoded)=>{
              if(err){
                return res.status(400).send({msg:"Invalid token"});
              }

              next();
    })

    } catch (error) {
        return res.status(400).send({msg:error});
    }

}

module.exports = { adminAuth } ;