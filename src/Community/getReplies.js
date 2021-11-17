const index = require('../index.js')
const app = index.app
//const client = index.client

const { MongoClient } = require('mongodb');
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('./replies', (req, res) => {
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
})