const index = require('./index.js')
const app = index.app
//const client = index.client

const { MongoClient } = require('mongodb');
const base64 = require('base-64');
const data = require('./env.json');

const uri = "mongodb+srv://" + base64.decode(data.token) + "@cluster0.c61q2.mongodb.net/users?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


module.exports = (req, res) => {
	const [email, password] = base64.decode(req.headers.token).split(":")
	console.log({token: base64.encode(email + ":" + password)})
	client.connect(async err => {
		const collection = client.db("users").collection("users");
		const doc = await collection.findOne({email: email})
		if (doc != null) {
			res.send({token: base64.encode(email + ":" + password + ':' + '0626')})
		}
		else {
			res.send({message: 'Email or password invalid! Please enter a valid email and a password with length >= 6'})
		}
		client.close();
	});
};

