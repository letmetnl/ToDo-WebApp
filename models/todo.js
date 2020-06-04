const mongoose = require('mongoose');

// the schema for tasks in todo list
const todoSchema = new mongoose.Schema({

    description: {
        type: String,
        require: true
    },

    category: {
        type: String,
        require: true
    },

    date: {
        type: Date,
        require: true
    }
  
});

// creating mongoose model for this schema:
const Todo = mongoose.model('todo', todoSchema);

// exporting the model 'todo' with the schema, so as to be used in 'index.js'
module.exports = Todo;