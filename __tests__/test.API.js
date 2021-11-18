// Test package uses MonboDB In-Momory Server under the hood
// https://github.com/shelfio/jest-mongodb#2-create-jest-mongodb-configjs
const {MongoClient} = require('mongodb');
// const getPosts = require('../src/Community/getPosts');

describe('Test API endpoints', () => {
  let connection;
  let db;

  // establish connection to in-memory server before each test
  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__);
    
    // create mock posts
    const docs = [
      {
      "_id": 1,
      "Title": "Test Post 01",
      "Author": "Test Author 01",
      "Text": "Test Text 01",
      "Likes": 1,
      "NumReplies": 0
      },

      {
      "_id": 2,
      "Title": "Test Post 02",
      "Author": "Test Author 02",
      "Text": "Test Text 02",
      "Likes": 2,
      "NumReplies": 0
      }
    ];


    await db.collection("posts").insertMany(docs);
  });

  // close connection after each test
  afterAll(async () => {
    await connection.close();
  });

  // test
  test('test post retrieval', async () => {
    const posts = db.collection("posts");
    const expectedPost = {
      "_id": 2,
      "Title": "Test Post 02",
      "Author": "Test Author 02",
      "Text": "Test Text 02",
      "Likes": 2,
      "NumReplies": 0
     }

    const retrievedPost = await posts.findOne({_id: 2});
    expect(retrievedPost).toEqual(expectedPost);
  });

  // test
  test('test retrieval of non-existant post', async () => {
    const posts = db.collection("posts");
    const expectedPost = {
      "_id": 2,
      "Title": "Test Post 02",
      "Author": "Test Author 02",
      "Text": "Test Text 02",
      "Likes": 2,
      "NumReplies": 0
     }

     const retrievedPost = await posts.findOne({_id: 999});
  });




});