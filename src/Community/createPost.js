const base64 = require('base-64');
const data = require('../env.json');
const { MongoClient } = require('mongodb');

module.exports = async function createPost(req, res, client)  {

    try {
        await client.connect();
        
        const post = JSON.parse(req.headers.post);

        const collection = client.db("users").collection("posts");

        const result = await collection.insertOne(post);

        // res.send(result.insertedId);
        
    } catch(err) {
        console.log(err);

    } finally {
        await client.close()

    }
};