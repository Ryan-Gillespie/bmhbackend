module.exports = async function setupMethod(client) {
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

    await client.connect();
    await client.db("users").collection("posts").insertMany(testPosts);
    await client.db("users").collection("users").insertMany(testUsers);
    await client.close();
}