 const nodemailer = require('nodemailer');
  const bcrypt = require("bcrypt")
 const adminModel = require("../model/adminModel")
 
// This is for sending mail to admin for reset passwoord link 
const sendMail = async (req, res) => {

    let email = req.body.email;
   
    let testAccount = await nodemailer.createTestAccount();
  
    // connect with the smtp
    let transporter = await nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: 'connor.tromp11@ethereal.email',
               pass: 'JVjPKnhekJfUpg2Rsb'
      },
 
    });
  
    let info = await transporter.sendMail({
      from: '"harshitjoshi" <connor.tromp11@ethereal.email>', // sender address
      to: email, // list of receivers
      subject: "Testing mail", // Subject line
      text: "Hello testing mail", // plain text body
      html:  "<p> For update your password  <a href=''>click here</a></p>"
    });
  
    console.log("Message sent: %s", info.response);
    res.json(info);
  };

  //reset password
const resetPassword = (req, res) => {
  let email = req.params.email;
  //request validation
  if (!req.body) {
       return res.status(400).send({
          message: 'Please send all the required information',
          "status": 400
      });
  } else {
      if (!req.params.email) {
        return res.status(400).send({
              message: 'Please send registered email address',
              "status": 400
          });
      } else {
          if (!req.body.password) {
            return  res.status(400).send({
                  message: 'Please enter password',
                  "status": 400
              });
          } else {
              if (!req.body.confirmPassword) {
                return  res.status(400).send({
                      message: 'Please enter confirm password',
                      "status": 400
                  });
              }
          }
      }
  }

  adminModel.findOne({ "email": email })
      .then(user => {
          if (user == null || user == '') {
              return res.status(500).send({
                  message: "Email address does not exist",
                  "status": 500
              });
          } else {
              if (req.body.password !== req.body.confirmPassword) {
                  return res.status(401).send({
                      message: 'password does not match',
                      "status": 401
                  })
              } else {
                  adminModel.findOneAndUpdate({
                      email: req.params.email
                  }, {
                      $set: {
                          password: bcrypt.hashSync(req.body.password, 8)
                      }
                  }, { new: true }).then(user => {
                      if (!user) {
                          return res.status(500).send({
                              message: "User does not exist.",
                              "status": 500
                          })
                      } else {
                          return res.status(200).send({ user: user, message: "Success", "status": 200 });
                      }
                  }).catch(err => {
                      return res.status(500).send({
                          message: "Error updating password with email " + email,
                          "status": 500
                      });
                  })
              }
          }
      })
      .catch(err => {
        return res.status(500).send({
              message: err.message,
              "status": 500
          });
      })
};
  
  module.exports = {sendMail ,resetPassword};




