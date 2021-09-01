let reply = ["Please Try Again","Hello, client!","I am doing good. What can I help you with!","I can answer questions related to 1. Technology  2. Finance 3. Business","Thank you client!"];

function conversations(msg){
    if(msg=="Hello") return 1;
    else if(msg=="How are you?") return 2;
    else if(msg=="FAQs") return 3;
    else if(msg=="Thank You") return 4;
    else return 0;
}

let express = require("express");

let app = express();

let http = require("http").Server(app);

let io = require('socket.io')(http);

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"//client.html");
})

io.on("connection",(socket)=> {
    console.log("Client connected");

    socket.emit("startup","Hello, you are connected.");


    socket.on("Client_Message",(msg)=> {
        let messageToClient = reply[conversations(msg[1])];

        let messageToConsole = "Hello "+msg[0]+",\nClient Message: "+msg[1]+"\nServer Message: "+messageToClient;
        console.log(messageToConsole);

        socket.emit("Server_Message",messageToClient);
    })
    
})


http.listen(9090,()=>console.log("Server running on port number 9090."));