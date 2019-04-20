const express = require("express"),
      passport = require('passport'),
      mongoose = require("mongoose"),
      router = express.Router();

//Load Post and User and Profile Model
const Post = require('../../models/Post');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

// Load Validation
const validatePostInput = require('../../validation/post');


// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Posts Works"}));

// @route   GET api/posts
// @desc    Get all post
// @access  Public
router.get('/', (req, res) => {
  Post.find()
    .sort({date: -1})
    .then(foundPosts => {
      if (!foundPosts) {
        return res.status(400).json({Post: `There are currently no posts`});
      }
      res.json(foundPosts);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(foundPost => {
      if (!foundPost) {
        return res.status(400).json({Post: `There are currently no posts`});
      }
      res.json(foundPost);
    })
    .catch(err => res.status(404).json(err));
});


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
  postFields._id = req.body._id;
  if(req.body.text) postFields.text = req.body.text;
  if(req.body.name) postFields.name = req.body.name;
  if(req.body.avatar) postFields.avatar = req.body.avatar;

  Post.create(postFields)
    .then(createdPost => res.json(createdPost))
    .catch(err => res.status(404).json(err));

});

// @route   PUT api/posts/edit/:id
// @desc    Update post
// @access  Private
router.put('/edit/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  const {errors, isValid} = validatePostInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  // Fields
  const postFields = {};
  if(req.body.text) postFields.text = req.body.text;
  if(req.body.name) postFields.name = req.body.name;
  if(req.body.avatar) postFields.avatar = req.body.avatar;

  Post.findById(req.params.id) // Do not use req.user.id because a user can have more than one post
    .then(foundPost => { 
      // Check if current user id matches the user id of the post
      if (foundPost.user.toString() !== req.user.id) {
        return res.status(401).json({notauthorized: 'User not authorized'});
      } else{
      // Update
      console.log('foundPost.user = ' + foundPost.user + ' /req.user.id = ' + req.user.id);
      console.log('////////////////');
      console.log('req.params.id = ' + req.params.id);
      console.log('////////////////');
      console.log('foundPost.id = ' + foundPost._id);
      console.log('////////////////');
      console.log('foundPost.name = ' + foundPost.name);
      console.log('////////////////');
      console.log('Found post = ' + foundPost);
      Post.findById(req.params.id)
      
        Post.findOneAndUpdate(
          {_id :req.params.id},
          {$set: postFields},
          {new: true},
          ) 
          .then(updatedPost => res.json(updatedPost))
          .catch(err => res.status(404).json(err));
      }
    })
    .catch(err => res.status(404).json({noaccess: "Unathourized"}));

});

// @route   DELETE api/posts/
// @desc    Delete post
// @access  Private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
      Post.findById(req.params.id)
        .then(foundPost => {
          // Check for post owner
          if(foundPost.user.toString() !== req.user.id) {
            return res.status(401).json({notauthorized: 'User not authorized'});
          }

          // Delete
          foundPost.remove()
            .then(() => res.json({Success: true}))
            .catch(err => res.json(err));
        })
        .catch(err => res.status(404).json({postnotfound: 'No post found'}));

});

module.exports = router;