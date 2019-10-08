var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
app.use(bodyParser.urlencoded({ extended: true}));

app.set('view engine', 'ejs');

app.use(express.static("public"));

var taskTodo = [];
var compTodo = [];

app.post('/addtask', function (req, res) {
    var newTask = req.body.doTask;
    taskTodo.push(newTask);
    res.redirect("/");
});

app.post("/removetask", function(req, res) {
    var taskComp = req.body.check;
    if (typeof taskComp === "string") {
        compTodo.push(taskComp);
        taskTodo.splice(taskTodo.indexOf(taskComp), 1);
    } else if (typeof taskComp === "object") {
        for (var i = 0; i < taskComp.length; i++) {
            compTodo.push(taskComp[i]);
            taskTodo.splice(taskTodo.indexOf(taskComp[i]), 1);
        }
    }
    res.redirect("/");
});
app.get("/", function(req, res) {
    res.render("index.ejs", { taskTodo: taskTodo, compTodo: compTodo });
});


app.get('*', function(req, res){
    res.send("invalid page");
});

app.listen(3000, function(){
    console.log("Listening on port 3000");
});

