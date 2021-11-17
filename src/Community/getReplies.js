
const base64 = require('base-64');
const data = require('../env.json');
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://" + base64.decode(data.token) + "@cluster0.c61q2.mongodb.net/users?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = (req, res) => {
    //const postId = req.headers.postId;
    client.connect(async err => {
		const collection = client.db("users").collection("replies");
		collection.find({}).limit(50)
        .toArray(function (err, result) {
          if (err) {
            res.status(400).send("Error fetching posts!");
         } else {
            res.json(result);
          }
        });
		client.close();
	});
}