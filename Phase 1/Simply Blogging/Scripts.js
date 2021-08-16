function addData(){

    BlogName = document.getElementById("BlogName").value;
    GenreName = document.getElementById("GenreName").value;
    Link = document.getElementById("Link").value;

    var array = JSON.parse(localStorage.getItem("array") || "[]");
    var TB = {
        bname : BlogName,
        gname : GenreName,
        link : Link,

    };
    array.push(TB);
    localStorage.setItem("array", JSON.stringify(array));
    console.log("The blog has been added");
}

function displayData(){

    var array = JSON.parse(localStorage.getItem("array" || "[]"));
    var displaytable = "";
    // var table = "<table border = 1, width = 100%><col style = 10%><col style = 10%><col style = 80%><tr><th>Blog Name</th><th>Genre Name</th><th>Link</th></tr></table>"
    array.forEach(element => {
        // displaytable +=  "<table class = table><thead><tr><th scope = col>Blog Name</th><th scope = col>Genre Name</th><th scope = col>Link</th></tr></thead><tr><td>" +element.bname+ "</td><td>" +element.gname+ "</td><td>$"+element.link+"</td></tr></table>"
        //    displaytable += "<div class=card style=width: 18rem> <img class=card-img-top src= "+element.Link+" alt = Card image cap><div class = card-body><h5 class = card-title>"+element.bname+"</h5><h6 class = card-subtitle mb-2 text-muted>"+element.gname+"</h6></div></div>" 
            displaytable += "<div class = card><div class = card-header> Featured </div> <div class = card-body><h5 class = card-title>"+element.bname+"</h5><p class = card-text> "+element.gname+" </p> <a href = "+element.link+" ,class = btn btn-primary>Click Here for Image</a></div></div> </div>"
    
    });
    var displaytable =  displaytable;
    document.getElementById("Btable").innerHTML = displaytable;
}