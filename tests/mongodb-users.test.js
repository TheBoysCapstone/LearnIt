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

    // Cleans the test database before the test runs and disconnects from db
    afterAll(async () => {
        await db.collection('users').deleteMany({});
        await connection.close();
    });

    it('Should insert a user into database', async done => {
        const users = db.collection('users');

        const mockUser = {_id: 'some-user-id', username: 'mock', password: 'mockPassword', email: 'mock@gmail.com'};
        await users.insertOne(mockUser);

        const insertedUser = await users.findOne({_id: 'some-user-id'});
        console.log(insertedUser);
        console.log(mockUser);
        expect(mockUser).toEqual(insertedUser);
    });
});