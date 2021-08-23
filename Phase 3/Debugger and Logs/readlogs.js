let fs = require('fs');
let readline = require("readline-sync");
let data = require('./logs.json');
debugger;
    let firstName = readline.question("Enter your First Name:\n");
    let lastName = readline.question("Enter your Last Name:\n");
    debugger;
    let gender = readline.question("Enter your Gender(male/female):\n");
    let email = readline.questionEMail("Enter your Email:\n");
    let date = new Date();
    

    
    data.push({ firstName: firstName, lastName: lastName, gender: gender, email: email , date : date });
    debugger;
    fs.writeFileSync("logs.json", JSON.stringify(data), (err) => {
        if (err) {
            console.error(err);
        }
    });
    debugger;
    console.log("New User Log has been stored stored!!!");

