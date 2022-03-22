// Test Connection to mongodb database server

const mongoose = require('mongoose');
const url = "mongodb+srv://theboys:learnit_password@learnit.9tsp5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

describe('connect', () => {

  it('Should connect to the database', async () => {
    await mongoose.connect(url, { useNewUrlParser: true })
  });

  it('Should disconnect from the database', async () => {
    await mongoose.disconnect(url, { useNewUrlParser: true })
  });

});