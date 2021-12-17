const base64 = require('base-64');
const data = require('../env.json');
const { MongoClient } = require('mongodb');

module.exports = async function getPosts(req, res, client) {
 
 	try {
		await client.connect();

		const collection = client.db("users").collection("posts");
    // return first 50 posts
    	const posts = await collection.find({}).limit(50).toArray();
   		
		res.send(posts);

	} catch(err) {
		console.log(err);

	} finally {
		await client.close();

	}
};