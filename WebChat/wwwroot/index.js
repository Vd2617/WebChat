"use strict";
var connection = connection = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Debug)
    .withUrl("/chat", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
    })
    .build();

document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (message,time) {

    var text = message;
    var parent = document.getElementsByTagName("ul")[0];
    var li = document.createElement("li");
    var messagetime = time;
    li.className = "list-group-item align-self-start";
  
        li.innerHTML = "<div class=\"card other-message \"><p class=\"text text-white text-center\">" + text + "<div class=\"text text-right mr-3 text-white\"><small>" + messagetime + "</small></div></p><img src=\"" + "./other.png" + "\" alt=\"Avatar\" class=\" avatar\"></div >";
   
    parent.appendChild(li);
});

 connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
    }).catch(function (err) {
      return console.error(err.toString());
 });

function GetTime() {

      var currentDate = new Date();

      var hours = currentDate.getHours();

      var minutes = currentDate.getMinutes();

      var strMinutes = minutes.toLocaleString();

      var strHours = hours.toLocaleString();

      if (minutes < 10)
          strMinutes = "0" + strMinutes;

      if (hours < 10)
          strHours = "0" + strHours;

       return strHours + ":" + strMinutes;;
}

function ShowClientMessage() {
    
    var parent = document.getElementsByTagName("ul")[0];

    var li = document.createElement("li");

    li.className = "list-group-item align-self-end";

    var text = document.getElementById('messageText').value;

    var time = GetTime();

    li.innerHTML = "<div class=\"card me-message \"><p class=\"text text-white text-center\">" + text + "<div class=\"text text-right mr-3 text-white\"><small>" + time + "</small></div></p><img src=\"" + "./1.png" + "\" alt=\"Avatar\" class=\" avatar\"></div >";

    parent.appendChild(li);

    }
document.getElementById("sendButton").addEventListener("click", function (event) {

       ShowClientMessage();

       var message = document.getElementById("messageText").value;

       var time = GetTime();

       connection.invoke("Send", message, time).catch(function (err) {
           return console.error(err.toString());
           ShowClientMessage();
    });
   
    

    event.preventDefault();
});
