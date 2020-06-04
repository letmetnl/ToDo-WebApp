// require the library
const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost/todo-list-db',{useNewUrlParser: true,useUnifiedTopology: true});

// acquire the connection (to check if it is successful)
const db = mongoose.connection;

// if error in connecting
db.on('error', console.error.bind(console, "Error in connecting to database."));

// if database is up and connected, then print the message
db.once('open', function(){
    console.log("Successfully connected to the database.");
});