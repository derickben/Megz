const express = require("express"),
      passport = require('passport'),
      mongoose = require("mongoose"),
      router = express.Router();

//Load Post and User Model
const Post = require('../../models/Post');
const User = require('../../models/User');

// Load Validation
const validatePostInput = require('../../validation/post');


// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Posts Works"}));


// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const {errors, isValid} = validatePostInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  // Fields
  const postFields = {};
  postFields.user = req.user.id; 
  if(req.body.text) postFields.text = req.body.text;
  if(req.body.name) postFields.name = req.body.name;
  if(req.body.avatar) postFields.avatar = req.body.avatar;

  // Comments
  const newComment = {
    user: req.user.id,
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar
  };

  //postFields.comments.push(newComment);

  Post.create(postFields)
    .then(createdPost => res.json(createdPost))
    .catch(err => res.status(404).json(err));

});



module.exports = router;