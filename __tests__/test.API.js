// Test package uses MonboDB In-Momory Server under the hood
// https://github.com/shelfio/jest-mongodb#2-create-jest-mongodb-configjs
const {MongoClient} = require('mongodb');
// const base64 = require('base-64');
// const data = require('../src/env.json');
const app = require('../src/index');
const supertest = require('supertest');
const request = supertest(app);

describe('Test getPosts functionality', () => {
  let connection;
  let db;

  // establish connection to in-memory server before each test
  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__);
  });

  // close connection after each test
  afterAll(async () => {
    await connection.close();
  });

  // first test
  test('should insert and retrieve a post', async () => {
    const posts = db.collection("posts");

    const mockPost = {text: "example post"};
    await posts.insertOne(mockPost);

    const insertedPost= await posts.findOne({text: "example post"});
    expect(insertedPost).toEqual(mockPost);
  });

  // second test
  test('should insert and retrieve a post', async () => {
    const posts = db.collection("posts");

    const mockPost = {text: "example post"};
    const wrongPost = {text: "this is the wrong post"};

    await posts.insertOne(mockPost);

    const insertedPost= await posts.findOne({text: "example post"});

    expect(insertedPost).not.toEqual(mockPost);
  });
});