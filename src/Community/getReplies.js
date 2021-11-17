const base64 = require('base-64');
const data = require('../env.json');
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://" + base64.decode(data.token) + "@cluster0.c61q2.mongodb.net/users?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = (req, res) => {
    const postId = req.headers.postId;
    client.connect(async err => {
		const collection = client.db("users").collection("replies");
		res.send(await collection.find({postId: postId}).limit(50).toArray());
		client.close();
	});
}