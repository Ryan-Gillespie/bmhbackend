const index = require('./index.js')
const app = index.app
const client = index.client

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