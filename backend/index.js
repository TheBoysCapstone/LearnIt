const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User = require('./user');
const bcrypt = require('bcryptjs')
const cookieParser = require("cookie-parser")
const passport = require("passport")
const LocalStrategy = require("passport-local")
const session = require('express-session')
const bodyParser = require("body-parser")
const cors = require('cors')
const port = 8080


//connect to database
mongoose.connect("mongodb+srv://theboys:learnit_password@learnit.9tsp5.mongodb.net/learnit?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
},
() => {
  console.log("Mongoose is connected")
}
)

//setup the json data parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//this middleware makes cross origin resource sharing(CORS) possible 
//without it the server will deny all requests made by the client
//for more info about CORS refer to the MDN docs
app.use(
  cors({
    origin: "http://localhost:3001", // <-- location of the react app we're connecting to
    credentials: true,
  })
);
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
//setup express session, this is needed by passport to function properly
app.use(
  session({
    secret: "secretcode" /*replace this with a better code later*/,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser("secretcode"));
//creates middleware that runs every time an HTTP request is made
//if it finds a session it saves the user id internally
app.use(passport.initialize());
//runs deserialize and attaches the user property to req.user
app.use(passport.session());

app.get('/', (req, res) => {
  res.redirect("/register")
})
//checks if the user exists in the database
//if it does it sends an error message back to the client
//if not it hashes the user's password builds a user object and saves it to the database
//after saving the user a message with redirect information is sent back to the client
app.post("/register", (req, res, next)=>{
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
      res.json({redirectTo: "login"})
    }
  })
  console.log(req.body)
})

//login route
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.json(req.user)
        console.log(req);
      });
    }
  })(req, res, next);
});
//test route to test if authentication is done automatically when user is logged in

app.get("/protected", (req, res)=>{
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

app.post("/logout", (req, res)=>{
  req.logout()
  console.log("user ",req.user)
  res.send("Success")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)})


