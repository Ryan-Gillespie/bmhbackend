const app = require('../src/app');
const { MongoClient } = require('mongodb');
const base64 = require('base-64');
const data = require('./env.json');

async function isEmailValid(enteredEmail) {
    if(enteredEmail[0] === '.' && enteredEmail[0] === '_' && enteredEmail[0] === '-') {
		return false;
	}
	if(enteredEmail.split("@").length === 2) {
		if(enteredEmail.split("@")[1].split(".").length === 2) {
			return true;
		} else {
			return false;
		}
	}
}

async function isPasswordValid(enteredPassword) {
	if(enteredPassword.length >= 6) return true;
	return false;
}

async function doesUserExist(email, collection) {
	const doc = await collection.findOne({email: email})
	if(doc === null) {
		return false
	}
	return true;
}

module.exports = async function register(req, res, client) {

	try {

		await client.connect();

		const [email, password] = base64.decode(req.headers.token).split(":")

		const collection = client.db("users").collection("users");

		const userExists = await doesUserExist(email, collection);

		if (userExists) {
			console.log("test");
			res.send({message: 'User email already exists! Try logging in.'})

		} else if (await isEmailValid(email) && await isPasswordValid(password)) {
			// add user to the collection
			const doc = await collection.insertOne({email: email, password: password});
			// send success token
			res.send({token: base64.encode(email + ":" + password + ':' + '0626')})

		} else {
			res.send({message: 'Email or password invalid! Please enter a valid email and a password with length >= 6'})
		}
	} catch(err) {
		console.log(err);

	} finally {
		// Ensures that the client will close on function return / error
		await client.close();
	}
}



