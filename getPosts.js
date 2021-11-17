const index = require('./index.js')
const app = index.app
const client = index.client

app.get('./posts', (req, res) => {
    client.connect(async err => {
		const collection = client.db("users").collection("posts");
		collection.find({}).limit(50)
        .toArray(function (err, result) {
          if (err) {
            res.status(400).send("Error fetching posts!");
         } else {
            console.log(res.json)
            res.json(result);
          }
        });
		client.close();
	});
})