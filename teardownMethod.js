module.exports = async function teardownMethod(client) {
    await client.connect();
    await client.db("users").collection("posts").deleteMany({});
    await client.db("users").collection("users").deleteMany({});
    await client.close();
}