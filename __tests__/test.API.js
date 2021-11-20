// Test package uses MonboDB In-Momory Server under the hood
// https://github.com/shelfio/jest-mongodb#2-create-jest-mongodb-configjs
const {MongoClient} = require('mongodb');
const base64 = require('base-64');
const data = require('../src/env.json');
const register = require('../src/register');

describe('Test API endpoints', () => {

  // variables in scope for all tests
  let client;
  let db;

  // establish connection to in-memory server before running tests
  beforeAll(async () => {
    client = new MongoClient(global.__MONGO_URI__, {
      useNewURLParser: true,
    });

    try {
      await client.connect();

    } catch (e) {
      console.error(e);
    }

    db = client.db(global.__MONGO_DB_NAME__);
    

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

  // close connection after tests are run
  // afterAll(async () => {
  //   await client.close();
  // });


  // test
  test('test register functionality', async() => {


    // mock user
    const email = "test001@test.com";
    const password = "password";

    const encoded = base64.encode(email + ":" + password)

    const mockRequest = {
      headers: {
        token: encoded
      }
    }

    const mockResponse = {
      json: jest.fn(),
      status: jest.fn(),
      send: jest.fn()
    }

    const expectedToken = {
      token: base64.encode(email + ":" + password + ":" + "0626")
    }

  register(mockRequest, mockResponse, client);

  // https://jestjs.io/docs/mock-functions#mock-property 
  // https://jestjs.io/docs/expect#toequalvalue
  console.log(mockResponse.send.mock) 
  // expect(mockResponse.send.mock.calls.length).toBe(1);
  // expect(mockResponse.send.mock.results[0].value).toEqual(expectedToken);
  })


  // test
  // test('test post retrieval', async () => {
  //   const posts = db.collection("posts");
  //   const expectedPost = {
  //     "_id": 2,
  //     "Title": "Test Post 02",
  //     "Author": "Test Author 02",
  //     "Text": "Test Text 02",
  //     "Likes": 2,
  //     "NumReplies": 0
  //    }

  //   const retrievedPost = await posts.findOne({_id: 2});
  //   expect(retrievedPost).toEqual(expectedPost);
  // });

  // test
  // test('test retrieval of non-existant post', async () => {
  //   const posts = db.collection("posts");
  //   const expectedPost = {
  //     "_id": 2,
  //     "Title": "Test Post 02",
  //     "Author": "Test Author 02",
  //     "Text": "Test Text 02",
  //     "Likes": 2,
  //     "NumReplies": 0
  //    }

  //    const retrievedPost = await posts.findOne({_id: 999});
  // });

});