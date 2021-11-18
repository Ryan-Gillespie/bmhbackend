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

// const uri = "mongodb+srv://" + base64.decode(data.token) + "@cluster0.c61q2.mongodb.net/users?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Quizzes endpoint
app.get('/quizzes', require('./getQuizzes'))

// Login Endpoint
app.get('./login', require('./login'))

async function userExists(email, collection) {
	if(await collection.findOne({email: email}) !== null) {
		return true
	}
	return false;
}

// Posts endpoint
app.get('./posts', require('./Community/getPosts'))

// Choose port
app.listen(3001, () => {console.log("listening on port 3001")});
