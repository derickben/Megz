const express = require("express"),
      mongoose = require("mongoose"),
      passport = require('passport'),
      router = express.Router();

//Load Profile and User Model
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Profile Works"}));


// @route   GET api/profile
// @desc    Get current users profile 
// @access  Private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
 const errors = {};

  Profile.findOne({user: req.user.id})
  .then(foundProfile => {
    if (!foundProfile) {
      errors.noprofile = `There is no profile for this User`;
      return res.status(404).json(errors)
    }
    res.json(foundProfile);

  })
  .catch(err => res.status(404).json(err));
});

module.exports = router;