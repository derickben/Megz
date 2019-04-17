const express = require("express"),
      gravatar = require('gravatar'),
      bcrypt = require('bcryptjs'),
      jwt = require('jsonwebtoken'),
      router = express.Router();

const keys = require('../../config/keys');


  //Load User Model
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Users Works"}));

// @route   POST api/users/register
// @desc    REgister user
// @access  Public
router.post("/register", (req, res) => {
  User.findOne({email: req.body.email})
  .then(foundUser => {
    if (foundUser) {
      return res.status(400).json({email: 'Email already exists'});
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
  const email = req.body.email;
  const password = req.body.password;

    //Find user by email
    User.findOne({email}, (err, foundUser) => {
      //Check for User
      if (!foundUser) {
        return res.status(404).json({email: 'User not found'});
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
            keys.secret, 
            {expiresIn: 3600}, 
            (err, token) => {
              res.json({
                success: true,
                token: `Bearer ${token}`
              });
          });
        } else {
          return res.status(400).json({password: 'Password Incorrect'});
        }
      });

    })
});

module.exports = router;