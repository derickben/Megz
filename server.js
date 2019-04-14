const express = require("express"),
      mongoose = require("mongoose"),
      users = require("./routes/api/users"),
      profile = require("./routes/api/profile"),
      posts = require("./routes/api/posts"),
      app = express();


//DB Config
const db = require('./config/keys').mongoURI;

//Connect to Mongo DB
mongoose
  .connect(db, { useNewUrlParser: true})
  .then(() => console.log(`MongoDB Connected`))
  .catch(err => console.log(err));

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.get("/", (req, res) => res.send("Hello world"));



const port = process.env.PORT || 5000;

app.listen(port, () => 
console.log(`Server running on ${port}`));