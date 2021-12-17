
const base64 = require('base-64');
const data = require('../env.json');
const { MongoClient, ObjectID } = require('mongodb');

module.exports = async function deletePost(req, res, client) {
    try {
		await client.connect();
		const database = client.db("users");
		const posts = database.collection("posts");
		const query = { _id: ObjectID(JSON.parse(req.headers.post)._id) };
		const result = await posts.deleteOne(query);
		if (result.deletedCount === 1) {
		  console.log("Successfully deleted one document.");
		} else {
		  console.log("No documents matched the query. Deleted 0 documents.");
		}
	  } finally {
		 await client.close();
	  }
}
