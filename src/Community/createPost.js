const base64 = require('base-64');
const data = require('../env.json');
const { MongoClient } = require('mongodb');

module.exports = (req, res, client) => {

    try {
        await client.connect();
        
        const post = req.main.postObject;

        const collection = client.db("users").collection("posts");

        await collection.insertOne(post);

        res.send({value: "to be replaced"});
        
    } catch(err) {
        console.log(err);

    } finally {
        await client.close()

    }
};
