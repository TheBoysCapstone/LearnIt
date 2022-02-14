const express = require('express')
const app = express()
const {MongoClient} = require('mongodb');
const port = 8080

const dbUri = "mongodb+srv://theboys:learnit_password@learnit.9tsp5.mongodb.net/learnit?retryWrites=true&w=majority"

const client = new MongoClient(dbUri)
let db = null;


 
  
  const connectToDatabase = async () => {
    try {
    // Connect the client to the server
    await client.connect();
    // Establish  connection
    db =  await client.db("learnit")
    console.log("Connection to the database established");

    //this line adds a user to the users collection to test the connection
    //await db.collection("users").insertOne({username: "user1", password: "1234"});
    
  }catch(e){
      console.error(e)
  }
  }


  connectToDatabase();



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)})


