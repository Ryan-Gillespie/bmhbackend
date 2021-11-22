// https://www.javascriptjanuary.com/blog/mocking-functionality-in-jest-at-different-scopes


// Test package uses MonboDB In-Momory Server under the hood
// https://github.com/shelfio/jest-mongodb#2-create-jest-mongodb-configjs
const {MongoClient} = require('mongodb');
const base64 = require('base-64');
const data = require('../src/env.json');
const register = require('../src/register');
const login = require('../src/login');
const getPosts = require('../src/Community/getPosts');
const createPost = require('../src/Community/createPost');

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
    const testPosts = [
      {
      _id: 1,
      Title: "Test Post 01",
      Author: "Test Author 01",
      Text: "Test Text 01",
      Likes: 1,
      NumReplies: 0
      },

      {
      _id: 2,
      Title: "Test Post 02",
      Author: "Test Author 02",
      Text: "Test Text 02",
      Likes: 2,
      NumReplies: 0
      }
    ];

    // create mock users
    const testUsers = [
      {
        _id: 101,
        email: "testuser101@test.com",
        password: "password"
      },

      {
        _id: 102,
        email: "testuser102@test.com",
        password: "password"
      }
  ];


    await db.collection("posts").insertMany(testPosts);
    await db.collection("users").insertMany(testUsers);
  });

  // close connection after tests are run
  // afterAll(async () => {
  //   await client.close();
  // });


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

    const mockCallback = jest
      .fn()
      .mockImplementation(token => token)
      .mockName('mockRegister');

    const mockResponse = {
      send: mockCallback 
    }

    const expectedToken = {
      token: base64.encode(email + ":" + password + ":" + "0626")
    }

    await register(mockRequest, mockResponse, client);

    // https://jestjs.io/docs/mock-functions#mock-property 
    // https://jestjs.io/docs/expect#toequalvalue
    expect(mockResponse.send.mock.results[0].value).toEqual(expectedToken);
  })

  test('request with valid login credentials', async() => {

    // mock user
    const email = "testuser101@test.com";
    const password = "password";

    const encoded = base64.encode(email + ":" + password)

    const mockRequest = {
      headers: {
        token: encoded
      }
    }

    const mockCallback = jest
      .fn()
      .mockImplementation(token => token)
      .mockName('mockSendLoginRecieptToken');

    const mockResponse = {
      send: mockCallback 
    }

    const expectedToken = {
      token: base64.encode(email + ":" + password + ":" + "0626")
    }

    await login(mockRequest, mockResponse, client);

    // https://jestjs.io/docs/mock-functions#mock-property 
    // https://jestjs.io/docs/expect#toequalvalue
    expect(mockResponse.send.mock.results[0].value).toEqual(expectedToken);
  })
  
  test('request with invalid login credentials', async() => {

    // mock user
    const email = "invalidUser@test.com";
    const password = "password";

    const encoded = base64.encode(email + ":" + password)

    const mockRequest = {
      headers: {
        token: encoded
      }
    }

    const mockCallback = jest
      .fn()
      .mockImplementation(token => token)
      .mockName('mockInvalidLogin');

    const mockResponse = {
      send: mockCallback 
    }

    const expectedMessage = {
      message: "Email or password invalid! " +
      "Please enter a valid email and a password with length >= 6"
    }

    await login(mockRequest, mockResponse, client);

    // https://jestjs.io/docs/mock-functions#mock-property 
    // https://jestjs.io/docs/expect#toequalvalue
    expect(mockResponse.send.mock.results[0].value).toEqual(expectedMessage);
  })

  test('test post creation', async () => {
    const mockRequest = {
      headers: {
        Title: "Test Post 03",
        Author: "Test Author 03",
        Text: "Test Text 03",
        Likes: 3,
        NumReplies: 0
      }
    }

    const mockCallback = jest
      .fn()
      .mockImplementation(token => token)
      .mockName('mockSendPosts');

    const mockResponse = {
      send: mockCallback 
    }

    const expectedResponse= {
      id: "recieved id"
    }

    await createPost(mockRequest, mockResponse, client);

    // test response value deep equals expected value
    expect(mockResponse.send.mock.value).

  })

  test('test post retrieval', async () => {
    
    const mockRequest = {}

    const mockCallback = jest
      .fn()
      .mockImplementation(token => token)
      .mockName('mockSendPosts');

    const mockResponse = {
      send: mockCallback 
    }

    const expectedPost = {
      "_id": 2,
      "Title": "Test Post 02",
      "Author": "Test Author 02",
      "Text": "Test Text 02",
      "Likes": 2,
      "NumReplies": 0
     }

    await getPosts(mockRequest, mockResponse, client);

    // recieved posts from the return value of the first call to MockCallBack
    const recievedPosts = mockResponse.send.mock.results[0].value;

    expect(recievedPosts[0]).toEqual(expectedPost);
  });

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