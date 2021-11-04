const express = require('express');
const bp = require('body-parser');
const cors = require('cors');
import { firebaseConfig } from "./firebaseConfig.js";
import { initializeApp } from "firebase/app";
import {createUser} from './register.js';


const app = express();
app.use(cors());
app.use(bp.json());
const firebase = initializeApp(firebaseConfig);

app.get('/login', (req, res) => {
	const {email, password} = req.headers
	createUser(email, password);
	// log user in
	//res.send({email: email, password: password});
});

app.post('/login', (req, res) => {
	res.send(req.body)
});

app.listen(3001, () => {console.log("listening on port 3001")});