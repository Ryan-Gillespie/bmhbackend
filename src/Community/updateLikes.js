const base64 = require('base-64');
const data = require('../env.json');
const { MongoClient, ObjectID } = require('mongodb');


module.exports = async function updateLikes(req, res, client) {
 
 	try {
		await client.connect();
		const collection = client.db("users").collection("posts");
        const filter = {_id: ObjectID(JSON.parse(req.headers.post)._id)};
        const options = {upsert:true}
        let likes = JSON.parse(req.headers.post).Likes
        const updateDoc = {
            $set: {
                Likes: likes
            },
        };
        const result = await collection.updateOne(filter, updateDoc, options);
        console.log(
            `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
        );
	} catch(err) {
		console.log(err);

	} finally {
		await client.close();
	}
};