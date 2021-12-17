const express = require('express');
const bp = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

exports.app = app = express();

const { MongoClient } = require('mongodb');
const base64 = require('base-64');
const data = require('./env.json');

const register = require('./register.js');
const login = require('./login.js');
const createReplies = require('../src/Community/createReplies');
const getReplies = require('../src/Community/getReplies');
const createPost = require('../src/Community/createPost');
const getPosts = require('../src/Community/getPosts');
const updatePostLikes = require('./Community/updatePostLikes');
const updateReplyLikes = require('./Community/updateReplyLikes');
const deletePost = require('./Community/deletePost');
const deleteReply = require('./Community/deleteReply')

app.use(cors());
app.use(bp.json());
app.use(morgan('combined'));

const uri = "mongodb+srv://" + base64.decode(data.token) + "@cluster0.c61q2.mongodb.net/users?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//Quizzes endpoint
app.get('/quizzes', require('./getQuizzes.js'))

//Login Endpoint
app.get('/login', function(req, res) {
    login(req, res, client);
})

//Register user endpoint
app.post('/register', function(req, res) {
    register(req, res, client);
});

// create posts endpoint
app.post('/posts', function(req, res) {
    createPost(req, res, client)
})

//get posts endpoint
app.get('/posts', function(req, res) {
    getPosts(req, res, client);
})

// create replies endpoint
app.post('/replies', function(req, res) {
    createReplies(req, res, client);
})

// get replies endpoint
app.get('/replies', function(req, res) {
    getReplies(req, res, client);
})

app.put('/updatePostLikes', function(req, res){
    updatePostLikes(req, res, client);
})

app.put('/updateReplyLikes', function(req, res){
    updateReplyLikes(req, res, client);
})

app.delete('/deletePost', function(req, res){
    deletePost(req, res, client);
})

app.delete('/deleteReply', function(req, res){
    deleteReply(req, res, client);
})

app.listen(3001, () => {console.log("listening on port 3001")});
