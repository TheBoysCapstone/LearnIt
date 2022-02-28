// Test if the database creates/stores certain users

const {MongoClient} = require('mongodb');
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

    afterAll(async () => {
        await connection.close();
    });

    // Cleans the test database after the test runs
    // afterEach(async () => {
    //     await db.collection('users').deleteMany({});
    // });

    it('Should insert a user into database', async done => {
        const users = db.collection('users');

        const mockUser = {username: 'mock', password: 'mockPassword', email: 'mock@gmail.com'};
        await users.insertOne(mockUser);

        const insertedUser = await testUsers.findOne({username: 'mock'});
        expect(insertedUser).toEqual(mockUser);
    });
});