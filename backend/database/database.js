//connect to database
const mongoose  = require("mongoose")

 mongoose.connect("mongodb+srv://theboys:learnit_password@learnit.9tsp5.mongodb.net/learnit?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
},
() => {
  console.log("Mongoose is connected")
}
)


