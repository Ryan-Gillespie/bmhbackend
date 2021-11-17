const index = require('../index.js')
const app = index.app
//const client = index.client
const base64 = require('base-64');
const data = require('../env.json');
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://" + base64.decode(data.token) + "@cluster0.c61q2.mongodb.net/users?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = (req, res) => {
    client.connect(async err => {
		const collection = client.db("users").collection("posts");
    const posts = await collection.find({}).limit(50).toArray();
    res.send(posts);
		client.close();
	});
};