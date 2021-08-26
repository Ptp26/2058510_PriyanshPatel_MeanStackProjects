let fs = require("fs");
let url = require("url");
let http = require("http");


let tasks = require("./tasks.json");

let taskplanner = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <title>Task Planner</title>
</head>
<body>
    <h1 style="border: 2; background-color: aquamarine; text-align: center;"> TASK PLANNER </h1>
    <hr/>
    <br/>
    <div style="text-align: center; border: 2px;">
        <h2 style="border: 1; "> Add Your Tasks Below </h2>
        <hr/>
        <form action = "addtask">
            <label> Employee ID</label>
            <input type = "text", name="empid"> <br/>
            <label> Employee Name</label>
            <input type = "text", name="ename"> <br/>
            <label> Task ID</label>
            <input type = "text", name="taskid"> <br/>
            <label> Task Name</label>
            <input type = "text", name="taskname"> <br/>
            <label> Due Date</label>
            <input type = "date", name="date"> <br/>
            <input type = "submit" value="Add Task">
            <input type = "reset" value = "Reset">
            
        </form>
    </div>
    <hr/>
    <div div style= "text-align: center; border: 2px;">
        <h2>  Delete Tasks</h2>
        <form action = "deletetask">
            <label> Enter the Task ID that you want to delete: </label>
            <input type = "text" name = "taskid">
            <input type = "submit" value="Delete Task">
        </form>
    </div>
    <hr/>
    <div style= "text-align: center; border: 2px;">
        <h2> Task List </h2>
        <form action = "showtable">
            <input type = "submit"  value = "Show all tasks">
        </form>
    </div>

    
</body>
</html>
`

function addtask(input){
    let newtask = { empid : input.empid, ename : input.ename , taskid : input.taskid, taskname :input.taskname , date : input.date };
    tasks.push(newtask);
    fs.writeFileSync('tasks.json' , JSON.stringify(tasks), (err) =>{
        if(!err){
            console.log("A new Task has been added!!");
            return true;
        }
    })
}
function deletetask(input){
    let tid = input.taskid;
    let index = tasks.findIndex(item => item.taskid == tid);
    if (index != -1){
        tasks.splice(index, 1);
        fs.writeFileSync('tasks.json', JSON.stringify(tasks), (err)=>{
            if(!err){
                console.log(tid + " has been deleted!");
            }
            return true;
        });
        
    }
    else{
        console.log("Record not found!");
        
    }
    return false
}

function printtable(){
    let tablecontent = "";

    let table = `
    <table class="table table-dark">
                            <thead>
                            <tr>
                                <th scope="col">Employee ID</th>
                                <th scope="col">Employee Name</th>
                                <th scope="col">Task ID</th>
                                <th scope = "col"> Task Name </th>
                                <th scope="col">Due Date</th>
                            </tr>
                            </thead>;
    `
    for (let i = 0 ; i < tasks.length ; i++){
        let itemlist = tasks[i];
        tablecontent += "<tbody><tr><td>" + itemlist.empid
        + "</td><td>" + itemlist.ename
        + "</td><td>" + itemlist.taskid
        + "</td><td>" + itemlist.taskname
        + "</td><td>" + itemlist.date
        + "</td></tr></tbody> "
    }
    endtable = "</table>";
    tablecontent = table + tablecontent + endtable;
    return tablecontent;
}


let  server = http.createServer((request,response)=>{
    let urlinfo = url.parse(request.url , true);
    if(urlinfo.path != "/favicon.ico"){
        response.writeHead(200 , {"content-type" : "text/html"});
    if(urlinfo.pathname == "/addtask"){
        let newtask = urlinfo.query;
        addtask(newtask);
        response.write("You task has been added successfully");
        let tabledet = printtable();
        response.write(taskplanner);
         response.write(tabledet);
    
    }
    else if(urlinfo.pathname =="/showtable"){
        let tabledet = printtable();
        response.write(taskplanner);
        response.write(tabledet);
    }
    else if(urlinfo.pathname == "/deletetask"){
        let tid = urlinfo.query;
        let result = deletetask(tid);
        if(result ){
            response.write(tid + "has been deleted!!!");

        }
        else{
            response.write("The task doesnt exist")
        }
        let tabledet = printtable();
        response.write(taskplanner);
        response.write(tabledet);
    }
    else{
        let tabledet = printtable();
        response.write(taskplanner);
        response.write(tabledet);
    }
    

}
    response.end();
});

server.listen(9090,() => console.log ("Server is listening to 9090 port...."));