const express = require("express"),
      { check, validationResult } = require('express-validator/check')
      gravatar = require('gravatar'),
      bcrypt = require('bcryptjs'),
      jwt = require('jsonwebtoken'),
      passport = require('passport'),
      router = express.Router();

const keys = require('../../config/keys');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


  //Load User Model
const User = require('../../models/User');


// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Users Works"}));

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  const {errors, isValid} = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({email: req.body.email})
  .then(foundUser => {
    if (foundUser) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);

    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', //Size
        r: 'pg', //Rating
        d: 'mm' //Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
          if(err) throw err;
          newUser.password = hash;
          newUser.save()
          .then(foundUser => res.json(foundUser))
          .catch(err => console.log(err));
        })
      });
    };
  })
  .catch(err => console.log(err));
});

// @route   POST api/users/register
// @desc    Login  user / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const {errors, isValid} = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

    //Find user by email
    User.findOne({ email }).then(foundUser => {
      //Check for User
      if (!foundUser) {
        errors.email = 'User NOT found';
        return res.status(404).json(errors);
      }

      // Check Password
      bcrypt.compare(password, foundUser.password, (err, isMatch) => {
        if (isMatch) {
          //User Matched

          const payload = {
            id: foundUser.id,
            name: foundUser.name,
            avatar: foundUser.avatar
          }; // Create JWT Payload

          //Sign Token
          jwt.sign(
            payload, 
            keys.secretOrKey, 
            {expiresIn: 3600}, 
            (err, token) => {
              res.json({
                success: true,
                token: `Bearer ${token}`
              });
          });
        } else {
          errors.password = `Password incorrect`;
          return res.status(400).json(errors);
        }
      });

    }) 
});

// @route   GET api/users/current
// @desc    Show current user
// @access  Private
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res)=> {
  const userProfile = {
    id: req.user.id,
    name: req.user.name,
    avatar: req.user.avatar,
    email: req.user.email,
  };

  res.json(userProfile);
});

module.exports = router;