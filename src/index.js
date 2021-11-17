const express = require('express');
const bp = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

exports.app = app = express();

const { MongoClient } = require('mongodb');
const base64 = require('base-64');
const data = require('./env.json');

app.use(cors());
app.use(bp.json());
app.use(morgan('combined'));

const uri = "mongodb+srv://" + base64.decode(data.token) + "@cluster0.c61q2.mongodb.net/users?retryWrites=true&w=majority";
exports.client = client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//Quizzes endpoint
app.get('/quizzes', require('./getQuizzes'))

//Login Endpoint
app.get('/login', (req, res) => {
	const [email, password] = base64.decode(req.headers.token).split(":")
	console.log({token: base64.encode(email + ":" + password)})
	client.connect(async err => {
		const collection = client.db("users").collection("users");
		const doc = await collection.findOne({email: email})
		if (doc != null) {
			res.send({token: base64.encode(email + ":" + password + ':' + 0626)})
		}
		else {
			res.send({message: 'Email or password invalid! Please enter a valid email and a password with length >= 6'})
		}
		client.close();
	});
});

//Register user endpoint
app.post('/register', (req, res) => {
	//var token = base64.encode(req.headers.email + ":" + req.headers.password + ":" + 0626)
	const [email, password] = base64.decode(req.headers.token).split(":")
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
});

function isEmailValid(enteredEmail) {

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

function isPasswordValid(enteredPassword) {
	if(enteredPassword.length >= 6) return true;
	return false;
}

function userExists(email, collection) {
	if(collection.findOne({email: email}) !== null) {
		return true
	}
	return false;
}

app.listen(3001, () => {console.log("listening on port 3001")});
