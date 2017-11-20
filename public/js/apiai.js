var baseUrl = "https://api.api.ai/v1/";
$(document).ready(function() {

 $("#input").keypress(function(event) {
  if (event.which == 13) {//13 == enter
   event.preventDefault();
   send();
  }
 });

 // $("#rec").click(function(event) {
 //  switchRecognition();
 // });

});

//

var recognition;
function startRecognition() {
 recognition = new webkitSpeechRecognition();
 recognition.onstart = function(event) {
  updateRec();
 };
 recognition.onresult = function(event) {
  var text = "";
     for (var i = event.resultIndex; i < event.results.length; ++i) {
      text += event.results[i][0].transcript;
     }
     setInput(text);
  stopRecognition();
 };
 recognition.onend = function() {
  stopRecognition();
 };
 recognition.lang = "en-US";
 recognition.start();
}

function stopRecognition() {
 if (recognition) {
  recognition.stop();
  recognition = null;
 }
 updateRec();
}
function switchRecognition() {
 if (recognition) {
  stopRecognition();
 } else {
  startRecognition();
 }
}
function setInput(text) {
 $("#input").val(text);
 send();
}
function updateRec() {
 $("#rec").text(recognition ? "Stop" : "Speak");
}



//send
var me = 0;
var tim = 0;
function send() {
 var text = $("#input").val();
 if (text != '')
 {
     $(".chat-container").append("<div class ='blank-space'></div><div class ='icon me'></div><div class ='me-chat'>" + text + "</div>");
     $('#input').val('');
     me++;
     tim++;
     $(".chat-container").append("<div class ='blank-space'></div><div class ='icon oscar'></div><div class ='oscar-chats'></div>");
     ScrollToBottom();

     $.ajax({
      type: "POST",
      url: baseUrl + "query?v=20150910",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      headers: {
       "Authorization": "Bearer " + accessToken
      },
      data: JSON.stringify({ query: text, lang: "en", sessionId: "somerandomthing" }),
      success: function(data) {
        setResponse(data.result.fulfillment.speech);
        var data = data.result.fulfillment.data;
        console.log(data);
        if (data != undefined) {
          console.log("ok");
          if (data["link"] != undefined){
            console.log(data["link"]);
            $(".chat-container").append("<div class ='oscar-chats'><a class ='oscar-link' href ='" + data["link"] + "' target ='_blank'>"+data["linkname"]+"</a></div>");//added the new element
            // $(".chat-container").append("<div class='oscar-linkbox'><iframe src='"+ data["link"] + "' target='_parent'  width = '300px' height = '200px'/></iframe></div>");//added the new element

            tim++;



          }//link is abailable
          else if (data["image"] != undefined) {
            console.log(data["image"]);
            $(".chat-container").append("<div class='oscar-image'><img src ='"+ data["image"] +"'/></div>");//added the new element

          }


        }
        ScrollToBottom();
      },
      error: function() {
       setResponse("Internal Server Error");
      }
     });
     setResponse("Loading...");
 }
}

function setResponse(val) {
 $(".oscar-chats").eq(tim).text(val);
}
