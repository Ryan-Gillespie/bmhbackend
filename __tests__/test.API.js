// https://www.javascriptjanuary.com/blog/mocking-functionality-in-jest-at-different-scopes


// Test package uses MonboDB In-Momory Server under the hood
// https://github.com/shelfio/jest-mongodb#2-create-jest-mongodb-configjs
const {MongoClient} = require('mongodb');
const base64 = require('base-64');
const data = require('../src/env.json');
const setupMethod = require('../setupMethod');
const teardownMethod = require('../teardownMethod');
const register = require('../src/register');
const login = require('../src/login');
const getPosts = require('../src/Community/getPosts');
const createPost = require('../src/Community/createPost');
const createReplies = require('../src/Community/createReplies');

describe('Test API endpoints', () => {

  // variables in scope for all tests
  var client;
  let db;

  // establish connection to in-memory server before running tests
  beforeAll(async () => {
    client = new MongoClient(global.__MONGO_URI__, {
      useNewURLParser: true,
    });

    try {
      await client.connect();
      db = client.db(global.__MONGO_DB_NAME__);

    } catch (e) {
      console.error(e);

    } finally {
    }
  }); 

  // setup mock data
  beforeEach(() => {
    return setupMethod(client);
  });   

  afterEach(() => {
    return teardownMethod(client);
  });

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

    expect(mockResponse.send.mock.results[0].value).toEqual(expectedToken);
  })

  test('request with valid login credentials', async() => {
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
      .mockName('mockSendLoginRecieptToken');

    const mockResponse = {
      send: mockCallback 
    }

    const expectedToken = {
      token: base64.encode(email + ":" + password + ":" + "0626")
    }

    // for some reason this does not find the document
    await login(mockRequest, mockResponse, client);

    expect(mockCallback.mock.calls[0][0]).toEqual(expectedToken);
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
    const mockPost = {
      Title: "Test Post 03",
      Author: "Test Author 03",
      Text: "Test Text 03",
      Likes: 3,
      NumReplies: 0,
    }

    const mockRequest = {
      headers: { 
        post: JSON.stringify(mockPost)
      }
    }

    const mockCallback = jest
      .fn()
      .mockImplementation(id => id)
      .mockName('mockSendPosts');

    const mockResponse = {
      send: mockCallback 
    }

    const expectedResponse= {
      id: "recieved id"
    }

    await createPost(mockRequest, mockResponse, client);

    // expect to recieve id of inserted document in the form of ObjectId 
    expect(24).toEqual(mockCallback.mock.calls[0][0].toHexString().length);

  })

  test('test post retrieval', async () => {
    const mockRequest = {};
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

    // recieved posts from the first arg of the first call to MockCallBack
    const recievedPosts = mockCallback.mock.calls[0][0];

    console.log(recievedPosts);

    expect(recievedPosts[1]).toEqual(expectedPost);
  });

  test('test reply creation', async () => {
    const mockReply= {
      Title: "Test Reply 01",
      Author: "Test Reply Author",
      Text: "Test Reply Text 01",
      Likes: 0,
    }

    const mockRequest = {
      headers: { 
        reply: JSON.stringify(mockReply)
      }
    }

    const mockCallback = jest
      .fn()
      .mockImplementation(id => id)
      .mockName('mockSendReply');

    const mockResponse = {
      send: mockCallback 
    }

    const expectedResponse= {
      id: "recieved id"
    }

    await createReplies(mockRequest, mockResponse, client);

    // expect to recieve id of inserted document in the form of ObjectId 
    expect(24).toEqual(mockCallback.mock.calls[0][0].toHexString().length);

  });

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