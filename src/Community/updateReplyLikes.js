const base64 = require('base-64');
const data = require('../env.json');
const { MongoClient, ObjectID } = require('mongodb');


module.exports = async function updateReplyLikes(req, res, client) {
    console.log("received reply = ", req.headers.reply)
 	try {
		await client.connect();
		const collection = client.db("users").collection("replies");
        const filter = {PostId: JSON.parse(req.headers.reply).PostId};
        const options = {upsert:true}
        let likes = JSON.parse(req.headers.reply).Likes
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