const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require('../models/user.js')
const bcrypt = require('bcryptjs')



//setup the passport local-strategy(authentication with username and password)
passport.use(new LocalStrategy((username, password, done)=>{
    User.findOne({username: username}).then((user)=>{
      if(!user) return done(null, false)
      bcrypt.compare(password, user.password, (err, result)=>{
        if(err) throw err
        if(result){
          return done (null, user)
        }
        else{
          return done(null, false)
        }
      })
      
    })
  }))
  //when a login attempt is successful the user id will be stored in the session
  passport.serializeUser((user, done)=>{
    done(null, user.id)
  })
  //if the session is still alive this will ensure user will not have to authenticate again
  passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=>{
      if(err) return done(err)
      done(null, user)
    })
  })