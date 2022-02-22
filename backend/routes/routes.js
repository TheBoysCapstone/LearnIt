const router = require('express').Router();
const passport = require('passport');
const bcrypt = require("bcryptjs")
const User = require('../models/user');


router.get('/', (req, res) => {
    res.json({redirectTo: "/register"})
  })


  //checks if the user exists in the database
  //if it does it sends an error message back to the client
  //if not it hashes the user's password, builds a user object and saves it to the database
  //after saving the user a message with redirect information is sent back to the client
  router.post("/register", (req, res, next)=>{
    User.findOne({username:req.body.username}, async(err, user)=>{
      if(user) {
        res.json({error: true, message: "User already exists. Try another username"})
      }
      else{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = new User({
          username:req.body.username,
          password: hashedPassword,
          email: req.body.email
        })
        await newUser.save()
        res.json({success : true ,redirectTo: "login"})
      }
    })
    console.log(req.body)
  })
  


 
//login route
router.post("/login", passport.authenticate('local',{failureRedirect: "/failed-login"}), (req, res)=>{
    res.json({user: req.user, redirectTo: 'user'})
})

//will fire when login fails
router.get("/failed-login", (req, res)=>{
    res.json({success: false, message: "Username or password is incorrect"})
})

//test route to test if authentication is done automatically when user is logged in  
router.get("/protected", (req, res)=>{
    //passport retrieves and saves the user object in req.user after login
    //after logout the user object is erased and becomes null
    //Checking if user is null tells us if a valid session exists or not 
    if(req.user){
      console.log(req.user)
      res.send("Successful authenticaion")
    }else{
      res.send("access forbidden")
    }
    
  })
  //this will remove all users in the users collection(for debugging purposes)
  router.post("/deleteall", (req, res)=>{
      User.remove((err)=>{
        if(err)
            res.json({success: false, message: "error occured while removing users"})
        else
                res.json({success: true, message: "all users removed"})
      })
  })
  
router.post("/logout", (req, res)=>{
    req.logout()
    console.log("user ",req.user)
    res.send("Success")
  })

  module.exports = router