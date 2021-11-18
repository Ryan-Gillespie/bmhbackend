const index = require('./index.js')
const app = index.app
//const client = index.client

const { MongoClient } = require('mongodb');
const base64 = require('base-64');
const data = require('./env.json');

const uri = "mongodb+srv://" + base64.decode(data.token) + "@cluster0.c61q2.mongodb.net/users?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

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

async function userExists(email, collection) {
	const doc = await collection.findOne({email: email})
	if(doc === null) {
		return false
	}
	return true;
}

module.exports = function register(req, res) {
	//var token = base64.encode(req.headers.email + ":" + req.headers.password + ":" + 0626)
	const [email, password] = base64.decode(req.headers.token).split(":")
	//const [email, password] = [req.headers.email, req.headers.password]
	client.connect(async err => {
		const collection = client.db("users").collection("users");
		if(await userExists(email, collection)) {
			res.send({message: 'User email already exists! Try logging in.'})
		} else if (await isEmailValid(email) && await isPasswordValid(password)) {
			const doc = await collection.insertOne({email: email, password: password});
			res.send({token: base64.encode(email + ":" + password + ':' + 0626)})
		} else {
			res.send({message: 'Email or password invalid! Please enter a valid email and a password with length >= 6'})
		}
		
		client.close();
	});
}



