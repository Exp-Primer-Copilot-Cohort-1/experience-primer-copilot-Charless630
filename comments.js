// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const { randomBytes } = require('crypto');
//const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Create comments object
const commentsByPostId = {};

// Create route to get comments
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create route to add comments
app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  // Get the comment from the body of the request
  const { content } = req.body;
  // Get the comments from the post id
  const comments = commentsByPostId[req.params.id] || [];
  // Push the new comment to the comments array
  comments.push({ id: commentId, content });
  // Add the comments to the posts object
  commentsByPostId[req.params.id] = comments;
  // Send back the comment
  res.status(201).send(comments);
});

// Create route to listen to port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});