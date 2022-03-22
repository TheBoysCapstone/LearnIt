const router = require('express').Router();
const passport = require('passport');
const bcrypt = require("bcryptjs")
const User = require('../models/user');
const authorize = require("../middleware/authorize")


router.get('/', (req, res) => {
  if(req.user){
    res.redirect(`/${req.user._id.toString()}`)
  }
  else{
    res.json({success: true, redirectTo: "signup"})
  }
    
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
      else if(req.body.password.length < 6){
        res.json({error: true, message: "Password must be 6 characters"})
      }
      else if(req.body.password.length > 16){
        res.json({error: true, message: "Password is too long"})
      }
      else if(req.body.password.search(/[a-z]/) < 0){
        res.json({error: true, message: "Password must contain a lowercase leter"})
      }
      else if(req.body.password.search(/[A-Z]/) < 0){
        res.json({error: true, message: "Password must contain a uppercase letter"})
      }
      else if(req.body.password.search(/[0-9]/) < 0){
        res.json({error: true, message: "Password must contain a number"})
      }
      else{
        const hashedPassword = await bcrypt.hash(req.body.password, 11)
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

// 
router.get("/:id", authorize, (req, res)=>{
      res.json({success: true, user: req.user, redirectTo:"user"})
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
//logs out user; make sure the right user is trying to logout
router.post("/:id/logout",authorize, (req, res)=>{
    req.logout()
    res.json({success: true})
  })

  module.exports = router