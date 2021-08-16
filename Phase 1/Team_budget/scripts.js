function addData(){

    ClientName = document.getElementById("ClientName").value;
    ProjectName = document.getElementById("ProjectName").value;
    Budget = document.getElementById("Budget").value;

    var array = JSON.parse(localStorage.getItem("array") || "[]");
    var TB = { cname : ClientName,
               pname : ProjectName,
               bud : Budget,              
    };
        array.push(TB);
        localStorage.setItem("array",JSON.stringify(array));
        console.log("Project Details are stored in local storage");
}

function displayData(){
    var array = JSON.parse(localStorage.getItem("array" || "[]" ));
    var displaytable = "";
    var total = 0;
    var table = "<table border=1><tr><th>Client Name</th><th>Project Name</th><th>Budget Amount: </th></tr>";
    array.forEach(element => {
        displaytable += "<tr><td>" +element.cname+ "</td><td>" +element.pname+ "</td><td>$"+element.bud+"</td></tr>"
        total += + element.bud;
    });
    var finaltable = "</table><br> Total Budget :$ " + total;
    displaytable = table + displaytable + finaltable;
    document.getElementById("Ftable").innerHTML = displaytable; 
}