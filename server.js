const express = require("express"),
      mongoose = require("mongoose"),
      //bodyParser = require('body-parser'),
      passport = require('passport'),
      users = require("./routes/api/users"),
      profile = require("./routes/api/profile"),
      posts = require("./routes/api/posts"),
      path = require('path'),
      app = express();


//Body parser
app.use(express.json({ extended: true }));
//app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to Mongo DB
mongoose
  .connect(db, { useNewUrlParser: true})
  .then(() => console.log(`MongoDB Connected`))
  .catch(err => console.log(err));

//Passport Middleware
app.use(passport.initialize());

//Passport Config
require(`./config/passport`)(passport);

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
 


const port = process.env.PORT || 5000;

app.listen(port, () => 
console.log(`Server running on ${port}`));