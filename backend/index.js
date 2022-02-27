const express = require('express')
const cookieParser = require("cookie-parser")
const passport = require("passport")
const session = require('express-session')
const bodyParser = require("body-parser")
const cors = require('cors')
const routes = require('./routes/routes.js')



const port = 8080


require("./database/database")
const app = express()
app.use(cookieParser("secretcode"));
//setup the json data parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//this middleware makes cross origin resource sharing(CORS) possible 
//without it the server will deny all requests made by the client
//for more info about CORS refer to the MDN docs
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app we're connecting to
    credentials: true,
  })
);

//setup express session, this is needed by passport to function properly
app.use(
  session({
    secret: "secretcode" /*replace this with a better code later*/,
    resave: false,
    saveUninitialized: true,
  })
);

require("./middleware/authenticate")


//creates middleware that runs every time an HTTP request is made
//if it finds a session it saves the user id internally
app.use(passport.initialize());
//runs deserialize and attaches the user property to req.user
app.use(passport.session());

//routes
app.use('/', routes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)})


