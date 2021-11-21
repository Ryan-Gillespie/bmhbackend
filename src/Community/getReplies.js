const base64 = require('base-64');
const data = require('../env.json');
const { MongoClient } = require('mongodb');

module.exports = async function getReplies(req, res, client) {

	try {
		await client.connect();

		const collection = client.db("users").collection("replies");

		const postId = req.headers.postId;

		res.send(await collection.find({postId: postId}).limit(50).toArray());

	} catch(err) {
		console.log(err);

	} finally {
		await client.close();

	}
}