const {MongoClient} = require('mongodb');
const base64 = require('base-64');
const data = require('../src/env.json');

const uri = "mongodb+srv://" + base64.decode(data.token) + "@cluster0.c61q2.mongodb.net/users?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

describe('Test getPosts functionality', () => {
  let connection;
  let db;

  // establish connection before each test
  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__);
  });

  // close connection after each test
  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  // first test
  it('should intert and retrieve a post', async () => {
    const posts = db.collection("posts");

    const mockPost = {text: "example post"};
    await posts.insertOne(mockPost);

    const insertedPost= await posts.findOne({text: "example post"});
    expect(insertedPost).toEqual(mockPost);
  });
});