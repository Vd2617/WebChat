"use strict";
var connection = connection = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Debug)
    .withUrl("/chat", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
    })
    .build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (message,minutes,hours) {

    var text = message;
    var hour = hours;
    var minute = minutes;

    var parent = document.getElementsByTagName("ul")[0];
    var li = document.createElement("li");
    li.className = "list-group-item align-self-start";
    if (minute < 10) {
        li.innerHTML = "<div class=\"card other-message \"><p class=\"text text-white text-center\">" + text + "<div class=\"text text-right mr-3 text-white\"><small>" + hour + ":0" + minute + "</small></div></p><img src=\"" + "./other.png" + "\" alt=\"Avatar\" class=\" avatar\"></div >";
    }
    else {
        li.innerHTML = "<div class=\"card other-message \"><p class=\"text text-white text-center\">" + text + "<div class=\"text text-right mr-3 text-white\"><small>" + hour + ":" + minute + "</small></div></p><img src=\"" + "./other.png" + "\" alt=\"Avatar\" class=\" avatar\"></div >";
    }
    parent.appendChild(li);
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {

    var message = document.getElementById("messageText").value;
    var currentDate = new Date();
    var hour = currentDate.getHours();
    var minute = currentDate.getMinutes();

    var minutes = currentDate.getMinutes().toLocaleString();//not toString ,use only toLocal string
    var hours = currentDate.getHours().toLocaleString();//not toString ,use only toLocal string

    connection.invoke("Send", message, minutes,hours).catch(function (err) {
        return console.error(err.toString());
    });
   
    var parent = document.getElementsByTagName("ul")[0];
    var li = document.createElement("li");
    li.className = "list-group-item align-self-end";
    var text = document.getElementById('messageText').value;
    if (minute < 10) {
        li.innerHTML = "<div class=\"card me-message \"><p class=\"text text-white text-center\">" + text + "<div class=\"text text-right mr-3 text-white\"><small>" + hour + ":0" + minute + "</small></div></p><img src=\"" + "./1.png" + "\" alt=\"Avatar\" class=\" avatar\"></div >";
    }   
    else {
        li.innerHTML = "<div class=\"card me-message \"><p class=\"text text-white text-center\">" + text + "<div class=\"text text-right mr-3 text-white\"><small>" + hour + ":" + minute + "</small></div></p><img src=\"" + "./1.png" + "\" alt=\"Avatar\" class=\" avatar\"></div >";
    }
    parent.appendChild(li);

    event.preventDefault();
});