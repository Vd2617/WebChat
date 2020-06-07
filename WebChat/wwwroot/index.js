const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("/chat")
    .build();

hubConnection.on("Send", function (data) {

    text = data;
    var parent = document.getElementsByTagName("ul")[0];
    var li = document.createElement("li");
    li.className = "list-group-item align-self-end";
    var text = document.getElementById('messageText').value;
    li.innerHTML = "<div class=\"card other-message \"><p class=\"text text-white text-center\">" + text + "<div class=\"text text-right mr-3 text-white\"><small>" + hours + ":" + minutes + "</small></div></p><img src=\"" + "./other.png" + "\" alt=\"Avatar\" class=\" avatar\"></div >";

    parent.appendChild(li);

});

function sendmessage() {
    var currentDate = new Date();
    var parent = document.getElementsByTagName("ul")[0];
    var li = document.createElement("li");
    li.className = "list-group-item align-self-end";
    var text = document.getElementById('messageText').value;
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    li.innerHTML = "<div class=\"card me-message \"><p class=\"text text-white text-center\">" + text + "<div class=\"text text-right mr-3 text-white\"><small>" + hours + ":" + minutes + "</small></div></p><img src=\"" + "./1.png" + "\" alt=\"Avatar\" class=\" avatar\"></div >";

    parent.appendChild(li);

    let message = document.getElementById("messageText").value;
    hubConnection.invoke("Send", message);
}

hubConnection.start();
