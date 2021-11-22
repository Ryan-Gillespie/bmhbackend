const base64 = require('base-64');
const data = require('../env.json');
const { MongoClient } = require('mongodb');

module.exports = async function createReplies(req, res, client) {

    try {
        await client.connect();

        const reply = JSON.parse(req.headers.reply);
        console.log(reply);

        const collection = client.db("users").collection("replies");

        const result = await collection.insertOne(reply);

        res.send(result.insertedId);
        
    } catch(err) {
        console.log(err);

    } finally {
        await client.close()

    }
};