const express=require('express');

//require path which is an inbuilt module
const path= require('path');

//the port on which our server will be running
const port = 8000;

//require database
const db=require('./config/mongoose');

// calling express
const app = express();

// import todo object from models
const Todo=require('./models/todo');

//using middleware for url encoding
app.use(express.urlencoded());

// setting up view engine i.e ejs and joining paths of views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//setting connection to static files and folders for using CSS n JavaScript files
app.use(express.static('assets'));

// rendering the home page from views
app.get('/', function(req, res){
    Todo.find({}, function(err, todos){
        if(err){console.log('Error in finding task ', err); return;}
        return res.render('home',{
            title: "My Task's ",
            todo_list: todos
        });
    });
});

//adding the task 
app.post('/create-todo',function(req, res){
    Todo.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
    }, function (err, newtodo) {
        if (err) {
            console.log('error in creating task', err);
            return;
        }
        return res.redirect('back');
    }
)
});

// to delete single task using trash icon 
app.get('/delete_todo_single', function(req, res) {
    let id = req.query.id;
    Todo.findByIdAndDelete(id, function(err){
        if(err) {
            console.log("error");
            return;
        }
        return res.redirect('back');
    });
});

// for deleting tasks using delete button
app.post('/delete-todo', function(req, res) {
    let ids = req.body.task;

    // if no task is selected n clicked delete button
    if (typeof(ids) == "undefined"){
        // alert("please add a task first!");
        return res.redirect('back');
    }
    // if single task is to be deleted
    if (typeof(ids) == "string") {
        Todo.findByIdAndDelete(ids, function(err) {
            if (err) { 
                console.log("error in deleting the task"); 
                return; 
            }
        });
    } else {    // if multiple tasks to be deleted
        for (let i = 0; i < ids.length; i++) {
            Todo.findByIdAndDelete(ids[i], function (err) {
                if (err) { 
                    console.log("error in deleting the tasks");
                    return; 
                }
            });
        }
    }
    return res.redirect('back');
});



// setting up the server at port
app.listen(port, function(err){
    if(err){
        console.log('Error in running the server', err);
    }
    console.log('yup!My express is up n running on port: ', port);
});