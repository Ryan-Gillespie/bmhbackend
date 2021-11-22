const { MongoClient } = require('mongodb');
const base64 = require('base-64');
const data = require('./env.json');

module.exports = async function login(req, res, client) {

	try {
		await client.connect();

		const [email, password] = base64.decode(req.headers.token).split(":")

		const collection = client.db("users").collection("users");

		const doc = await collection.findOne({email: email})

		if (doc != null) {
			res.send({token: base64.encode(email + ":" + password + ':' + '0626')})

		} else {
			res.send({message: 'Email or password invalid! Please enter a valid email and a password with length >= 6'})
		}

	} catch(err) {
		console.log(err);

	} finally {
		await client.close();

	}
};