const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async(req, res) => {


  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

   const d = await user.save();
   

    if (req.body.roles) {
  
      const rol =   await Role.find(
        {
          name: { $in: req.body.roles }
        }
        
      );

      user.roles = rol.map(role => role._id);

      let p = await user.save();


    } else {
     const userole = await Role.findOne({ name: "user" });

     user.roles = [userole._id];

     let p = await user.save();

      
    }

    



};
