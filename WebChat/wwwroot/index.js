$(document).ready(function () {
    scrollToElement($("#messageText"));

    "use strict";
    var messageCounter = 0;
    var connection = connection = new signalR.HubConnectionBuilder()
        .configureLogging(signalR.LogLevel.Debug)
        .withUrl("/chat", {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets
        })
        .build();

    document.getElementById("sendButton").disabled = true;

    connection.on("ReceiveMessage", function (message, time) {

        var text = message;

        var parent = document.getElementsByClassName("message-box")[0];

        var li = document.createElement("li");

        var messagetime = time;
        li.className = "list-group-item align-self-start item";

        li.innerHTML = "<div class=\"card other-message \"id = \"new-message\" ><p class=\"text text-white text-center\">" + text + "<div class=\"text text-right mr-3 text-white\"><small>" + messagetime + "</small></div></p><img src=\"" + "./other.jpg" + "\" alt=\"Avatar\" class=\" avatar\"></div >";

        parent.appendChild(li);

        StyleGetNewMessage();
      
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


        var parent = document.getElementsByClassName("message-box")[0];
        var li = document.createElement("li");

        li.className = "list-group-item align-self-end item";

        var text = document.getElementById('messageText').value;

        var time = GetTime();

        li.innerHTML = "<div class=\"card me-message \" ><p class=\"text text-white text-center\">" + text + "<div class=\"text text-right mr-3 text-white\"><small>" + time + "</small></div></p><img src=\"" + "./1.png" + "\" alt=\"Avatar\" class=\" avatar\"></div >";

        parent.appendChild(li);
        setTimeout(function () {
            scrollToElement($("#messageText"));
        }, 100); 
      


    }
    document.getElementById("sendButton").addEventListener("click", function (event) {

        var message = document.getElementById("messageText").value;
        var status = "Ok";
        var time = GetTime()
        connection.invoke("Send", message, time).catch(function (err) {
           
            var status = "Faild"
            return console.error(err.toString());



        });
        if (status = "Ok")
            ShowClientMessage();
        else {
            ShowSendErrorMessage();
        }
        event.preventDefault();
    });

    function ShowSendErrorMessage(){


        var parent = document.getElementsByClassName("message-box")[0];

        var li = document.createElement("li");

        li.className = "list-group-item align-self-end item";


        var time = GetTime();

        li.innerHTML = "<div class=\"card me-message \"><p class=\"text text-white text-center\">" + "Error,message not send" + "<div class=\"text text-right mr-3 text-white\"><small>" + time + "</small></div></p><img src=\"" + "./1.png" + "\" alt=\"Avatar\" class=\" avatar\"></div >";

        parent.appendChild(li);

        scrollToElement($("#messageText"));

    }

    //other code scrol to textarea 

    $("scroll-to").click(function () {
        var elementClick = $(this).attr("href")

        var destination = $(elementClick).offset().top;

        jQuery("html:not(:animated),body:not(:animated)").animate({
            scrollTop: destination
        }, 800);
        return false;
    });

    //where send message scroll to text area

    function scrollToElement(ele) {


        $(window).scrollTop(ele.offset().top).scrollLeft(ele.offset().left);
        messageCounter++;
       
    }
    //mouseover message event message read
   
    $(document).on('mouseover', '#new-message', function (e)  {
       
        if (messageCounter > 0) {

            messageCounter = messageCounter - 1

            var barge = document.getElementById("message-counter");

            barge.innerText = messageCounter.toLocaleString();
            $(this).attr("id", "read");

            if (messageCounter === 0) {
                StyleMessagesRead();
            }
        }
    
    });
  
    function StyleMessagesRead() {

       
            var bell = document.getElementById("bell");

            bell.style.color = '#ffffff';

            var barge = document.getElementById("message-counter");

            barge.innerText = messageCounter.toLocaleString();
        
    }
    function StyleGetNewMessage() {
        /*get message*/
        messageCounter = messageCounter + 1;

        var bell = document.getElementById("bell");

        bell.style.color = '#00adef';

        var barge = document.getElementById("message-counter");

        barge.innerText = messageCounter.toLocaleString();
      
    }
   
});


