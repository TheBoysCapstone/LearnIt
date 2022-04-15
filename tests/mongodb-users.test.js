// Test if the database creates/stores certain users

const {MongoClient} = require('mongodb');
const jestConfig = require('./jest-config');
const url = "mongodb+srv://theboys:learnit_password@learnit.9tsp5.mongodb.net/test?retryWrites=true&w=majority";

describe('insert', () => {

    let connection;
    let db;
    
    beforeAll(async () => {
        connection = await MongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
          db = await connection.db();
    });

    // Cleans the test database after the test runs and disconnects from db
    afterAll(async () => {
        await db.collection('users').deleteMany({});
        await connection.close();
    });

    it('Should insert a user into database', async () => {
        const users = db.collection('users');

        const mockUser = {username: 'mock', password: 'Capstone2022', email: 'mock@gmail.com'};
        await users.insertOne(mockUser);

        const insertedUser = await users.findOne({username: 'mock'});
        expect(mockUser).toEqual(insertedUser);
    });
});