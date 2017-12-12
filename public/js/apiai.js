var baseUrl = "https://api.api.ai/v1/";
var userID = "";
var sessionID = "";
$(document).ready(function() {

  $.getJSON("api/user_data", function(data) {
      // Make sure the data contains the username as expected before using it
      if (data.hasOwnProperty('username')) {
          console.log('Usrename: ' + data.username.email);
          console.log('SessionID: ' + data.sessionID);
          userID = data.username.email;
          sessionID = data.sessionID;
      }
  });

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
      data: JSON.stringify({ originalRequest: {data: {exampleMessage: userID}}, query: text, lang: "en", sessionId: sessionID }),
      success: function(data) {
        var datum = data.result.fulfillment.data;
        if(datum != undefined) {console.log(datum["email"]);}

        if(datum == undefined || (datum != undefined && datum["email"] === userID.toString())) {
          setResponse(data.result.fulfillment.speech);
          // var data = data.result.fulfillment.data;
          console.log(datum);
          if (datum != undefined) {
            console.log("ok");
            if (datum["act"] == "add") {
              if (datum["given-name"] != undefined){//given name이있을경우
                console.log(datum["given-name"]);
                //ajax codes are here and there
                addTaskWithPerson(datum["given-name"], datum["tasktitle"]);
              }//link is abailable
              else if (datum["tasktitle"] != undefined) { //still has a task
                console.log(datum["tasktitle"]);
                addTask(datum["tasktitle"]);
              }
            }
            else if(datum["act"] == "found") {
              var i = 0;
              console.log(datum["resList"]);
              console.log(datum["resList"][0].title);
              console.log(datum["resList"].length);

              var stack = setInterval(function() {
                console.log(i);
                console.log(datum["resList"][i].title);
                $(".chat-container").append(`<div class ='oscar-chats'><div class ='oscar-task-res'>
                <li class='list-item'>
          					<div class = 'prioritized `+datum["resList"][i].importance+`'></div>
          					<h2>`+datum["resList"][i].dlday+`, `+datum["resList"][i].dlmonth+`, `+datum["resList"][i].dlyear+`</h2>
          					<br/>
          					<h3>`+datum["resList"][i].title+` With @`+datum["resList"][i].associate+`</h3>
          				</li>
          			</div></div>`);//added the new element
                tim++;
                i++;
                ScrollToBottom();
                if (i >= datum["resList"].length) {
                  clearInterval(stack);
                  ScrollToBottom();
                }

              }, 500);

              // for (var i = 0; i < datum["resList"].length; i++) {
              //   console.log(i);
              //   console.log(datum["resList"][i].title);
              //   $(".chat-container").append(`<div class ='oscar-chats'><div class ='oscar-task-res'>
              //   <li class='list-item'>
          		// 			<div class = 'prioritized `+datum["resList"][i].importance+`'></div>
          		// 			<h2>`+datum["resList"][i].dlday+`, `+datum["resList"][i].dlmonth+`, `+datum["resList"][i].dlyear+`</h2>
          		// 			<br/>
          		// 			<h3>`+datum["resList"][i].title+` With @`+datum["resList"][i].associate+`</h3>
          		// 		</li>
          		// 	</div></div>`);//added the new element
              //
              //
              //   tim++;
              //
              // }
            }
            else if(datum["act"] == "notfound") {

            }
            else if(datum["act"] == "adddeadline") {
              $.ajax({
                          url: '/addtaskdl',
                          dataType: 'json',
                          type: 'POST',
                          data: {"deadline":datum["deadline"], "title":datum["tasktitle"]},
                          success: function(result) {
                            console.log('OK');
                            if ( result['result'] == true ) {

                              var newCard = `<li class='list-item'>
                                <div class = 'prioritized e'></div>
                                <h2>`+result['task']['dlday']+`, `+result['task']['dlmonth']+`, `+result['task']['dlyear']+`</h2>
                                <br/>
                                <h3>`+result['title']+` With @`+result['task']['associate']+`</h3>
                              </li>`

                              var $newCard = $(newCard);
                              $('#Unsorted + .list-inner-scroll').last().prepend($newCard);
                              // $newCard.focus();

                              // console.log(result['task']['importance']);
                            }
                            else {}
                          }
                      });
            }
            else if(datum["act"] == "addgroupname") {
              $.ajax({
                          url: '/addtaskgroupname',
                          dataType: 'json',
                          type: 'POST',
                          data: {"groupname":datum["groupname"], "title":datum["tasktitle"]},
                          success: function(result) {
                            console.log('OK');
                            if ( result['result'] == true ) {

                              var newCard = `<li class='list-item'>
                                <div class = 'prioritized e'></div>
                                <h2>`+result['task']['dlday']+`, `+result['task']['dlmonth']+`, `+result['task']['dlyear']+`</h2>
                                <br/>
                                <h3>`+result['title']+` With @`+result['task']['associate']+`</h3>
                              </li>`

                              var $newCard = $(newCard);
                              $('#' + result['task']['group'] + ' + .list-inner-scroll').last().prepend($newCard);
                              // $newCard.focus();

                              // console.log(result['task']['importance']);
                            }
                            else {}
                          }
                      });
            }
            else if(datum["act"] == "addsuperimp") {
              $.ajax({
                          url: '/addsuperimptask',
                          dataType: 'json',
                          type: 'POST',
                          data: {"title":datum["tasktitle"]},
                          success: function(result) {
                            console.log('OK');
                            if ( result['result'] == true ) {

                              var newCard = `<li class='list-item'>
                                <div class = 'prioritized a'></div>
                                <h2>`+result['task']['dlday']+`, `+result['task']['dlmonth']+`, `+result['task']['dlyear']+`</h2>
                                <br/>
                                <h3>`+result['title']+` With @`+result['task']['associate']+`</h3>
                              </li>`

                              var $newCard = $(newCard);
                              $('#Unsorted + .list-inner-scroll').last().prepend($newCard);
                              // $newCard.focus();

                              // console.log(result['task']['importance']);
                            }
                            else {}
                          }
                      });
            }
            else if(datum["act"] == "addagroup") {
              $.ajax({
                          url: '/addgroup',
                          dataType: 'json',
                          type: 'POST',
                          data: {"name":datum["groupname"]},
                          success: function(result) {
                            console.log('OK');
                            if ( result['result'] == true ) {
                              console.log(result['name']);

                              var newList = `
                              <div class="list list-dimension group">
                                <div class = "group-title" id = "`+result['name']+`">`+result['name']+`</div>
                                <ul class="list-inner-scroll">
                                  </ul>
                                  <button class="add-card-button">Add a card...</button>
                                </div>
                              `;

                              var $newList = $(newList);
                              $('.list-container').find('.list').last().after($newList);
                              $('.listmodal').hide();//maybe working
                              $('#addlistform')[0].reset();
                            }
                            else {}
                          }
                      });

            }

            else if(datum["act"] == "adddeadlinegroupname") {
              $.ajax({
                          url: '/adddeadlinegroupname',
                          dataType: 'json',
                          type: 'POST',
                          data: {"deadline":datum["deadline"], "groupname":datum["groupname"], "title":datum["tasktitle"]},
                          success: function(result) {
                            console.log('OK');
                            if ( result['result'] == true ) {

                              var newCard = `<li class='list-item'>
                                <div class = 'prioritized e'></div>
                                <h2>`+result['task']['dlday']+`, `+result['task']['dlmonth']+`, `+result['task']['dlyear']+`</h2>
                                <br/>
                                <h3>`+result['title']+` With @`+result['task']['associate']+`</h3>
                              </li>`

                              var $newCard = $(newCard);
                              $('#' + result['task']['group'] + ' + .list-inner-scroll').last().prepend($newCard);
                              // $newCard.focus();

                              // console.log(result['task']['importance']);
                            }
                            else {}
                          }
                      });
            }

            else if(datum["act"] == "adddeadlineimp") {
              $.ajax({
                          url: '/adddeadlineimp',
                          dataType: 'json',
                          type: 'POST',
                          data: {"deadline":datum["deadline"], "title":datum["tasktitle"]},
                          success: function(result) {
                            console.log('OK');
                            if ( result['result'] == true ) {

                              var newCard = `<li class='list-item'>
                                <div class = 'prioritized `+result['task']['importance']+`'></div>
                                <h2>`+result['task']['dlday']+`, `+result['task']['dlmonth']+`, `+result['task']['dlyear']+`</h2>
                                <br/>
                                <h3>`+result['title']+` With @`+result['task']['associate']+`</h3>
                              </li>`

                              var $newCard = $(newCard);
                              $('#Unsorted + .list-inner-scroll').last().prepend($newCard);
                              // $newCard.focus();

                              // console.log(result['task']['importance']);
                            }
                            else {}
                          }
                      });
            }
            else if(datum["act"] == "addgroupimp") {
              $.ajax({
                          url: '/addgroupimp',
                          dataType: 'json',
                          type: 'POST',
                          data: {"groupname":datum["groupname"], "title":datum["tasktitle"]},
                          success: function(result) {
                            console.log('OK');
                            if ( result['result'] == true ) {

                              var newCard = `<li class='list-item'>
                                <div class = 'prioritized `+result['task']['importance']+`'></div>
                                <h2>`+result['task']['dlday']+`, `+result['task']['dlmonth']+`, `+result['task']['dlyear']+`</h2>
                                <br/>
                                <h3>`+result['title']+` With @`+result['task']['associate']+`</h3>
                              </li>`

                              var $newCard = $(newCard);
                              $('#' + result['task']['group'] + ' + .list-inner-scroll').last().prepend($newCard);
                              // $newCard.focus();

                              // console.log(result['task']['importance']);
                            }
                            else {}
                          }
                      });
            }

            else if(datum["act"] == "adddeadlinegroupimp") {
              $.ajax({
                          url: '/adddeadlinegroupimp',
                          dataType: 'json',
                          type: 'POST',
                          data: {"deadline":datum["deadline"], "groupname":datum["groupname"], "title":datum["tasktitle"]},
                          success: function(result) {
                            console.log('OK');
                            if ( result['result'] == true ) {

                              var newCard = `<li class='list-item'>
                                <div class = 'prioritized `+result['task']['importance']+`'></div>
                                <h2>`+result['task']['dlday']+`, `+result['task']['dlmonth']+`, `+result['task']['dlyear']+`</h2>
                                <br/>
                                <h3>`+result['title']+` With @`+result['task']['associate']+`</h3>
                              </li>`

                              var $newCard = $(newCard);
                              $('#' + result['task']['group'] + ' + .list-inner-scroll').last().prepend($newCard);
                              // $newCard.focus();

                              // console.log(result['task']['importance']);
                            }
                            else {}
                          }
                      });
            }
            else if(datum["act"] == "deletetask") {
              $.ajax({
                          url: '/deletetask',
                          dataType: 'json',
                          type: 'POST',
                          data: {"groupname":datum["groupname"], "title":datum["tasktitle"]},
                          success: function(result) {
                            console.log('OK');
                            if ( result['result'] == true ) {
                              console.log("WOW");

                              var link = $('#'+result['groupname']).parent();
                              var link2 = link.find('h3:contains("'+result['title']+'")').first().parent();
                              console.log(link);

                              // var link = $("h3:contains(opal fruits)")
                              //
                              // var link = $('.delete[data-userid="' + userId + '"]');
                              // var parent = link.parent();
                              // console.log(parent);

                              link2.remove();

                              // var newCard = `<li class='list-item'>
                              //   <div class = 'prioritized e'></div>
                              //   <h2>`+result['task']['dlday']+`, `+result['task']['dlmonth']+`, `+result['task']['dlyear']+`</h2>
                              //   <br/>
                              //   <h3>`+result['title']+` With @`+result['task']['associate']+`</h3>
                              // </li>`
                              //
                              // var $newCard = $(newCard);
                              // $('#' + result['task']['group'] + ' + .list-inner-scroll').last().prepend($newCard);

                            }
                            else {}
                          }
                      });
            }

            else if(datum["act"] == "deleteagroup") {
              $.ajax({
                          url: '/deletegroup',
                          dataType: 'json',
                          type: 'POST',
                          data: {"name":datum["groupname"]},
                          success: function(result) {
                            console.log('OK');
                            if ( result['result'] == true ) {
                              console.log(result['name']);//groupname

                              var link = $('#'+result['name']).parent();
                              link.remove();
                            }
                            else {}
                          }
                      });

            }
            else if (datum["act"] == "help"){
              var i = 0;
              console.log(datum["help-title"]);
              var helpTitle = JSON.parse(datum["help-title"]);
              var help = JSON.parse(datum["help"]);

              var stack = setInterval(function() {
                $(".chat-container").append("<div class ='oscar-chats'><div class ='oscar-help'><h3>"+helpTitle[i]+"</h3><p>"+help[i]+ "</p></div></div>");//added the new element
                tim++;
                i++;
                ScrollToBottom();
                if (i >= 6) {
                  clearInterval(stack);
                  showlink2();

                }

              }, 500);

              function showlink2() {
                var showlink = setTimeout(function() {
                  $(".chat-container").append("<div class ='oscar-chats'><a class ='oscar-link' href ='" + datum["link"] + "' target ='_blank'>"+datum["linkname"]+"</a></div>");//added the new element
                  tim++;
                  ScrollToBottom();
                }, 500);
              }


                // $(".chat-container").append("<div class ='oscar-chats'><div class ='oscar-help'><h3> Add a task </h3><p>"+datum["help"][i]+ "</p></div></div>");//added the new element
                //
                // $(".chat-container").append("<div class ='oscar-chats'><div class ='oscar-help'><h3> Find a task </h3><p>"+datum["help2"]+ "</p></div></div>");//added the new element
                // $(".chat-container").append("<div class ='oscar-chats'><div class ='oscar-help'><h3> Recomendation </h3><p>"+datum["help3"]+ "</p></div></div>");//added the new element

                console.log(datum["link"]);
                // $(".chat-container").append("<div class ='oscar-chats'><a class ='oscar-link' href ='" + datum["link"] + "' target ='_blank'>"+datum["linkname"]+"</a></div>");//added the new element
                // $(".chat-container").append("<div class='oscar-linkbox'><iframe src='"+ data["link"] + "' target='_parent'  width = '300px' height = '200px'/></iframe></div>");//added the new element

            }//link is available
            else if (datum["link"] != undefined){
                console.log(datum["link"]);
                $(".chat-container").append("<div class ='oscar-chats'><a class ='oscar-link' href ='" + datum["link"] + "' target ='_blank'>"+datum["linkname"]+"</a></div>");//added the new element
                // $(".chat-container").append("<div class='oscar-linkbox'><iframe src='"+ data["link"] + "' target='_parent'  width = '300px' height = '200px'/></iframe></div>");//added the new element

                tim++;
            }//link is available

          }
          ScrollToBottom();
        }
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

function addTaskWithPerson(givenname, tasktitle) {
  console.log("WOW");
  console.log(givenname);
  $.ajax({
              url: '/addtask',
              dataType: 'json',
              type: 'POST',
              data: {"associate":givenname, "title":tasktitle},
              success: function(result) {
                console.log('OK');
                if ( result['result'] == true ) {

                  var newCard = `<li class='list-item'>
                    <div class = 'prioritized e'></div>
                    <h2>`+result['task']['dlday']+`, `+result['task']['dlmonth']+`, `+result['task']['dlyear']+`</h2>
                    <br/>
                    <h3>`+result['title']+` With @`+result['associate']+`</h3>
                  </li>`

                  var $newCard = $(newCard);
                  $('#Unsorted + .list-inner-scroll').last().prepend($newCard);
                  // $newCard.focus();

                  // console.log(result['task']['importance']);
                }
                else {}
              }
          });
}

function addTask(tasktitle) {
  console.log("WOW indeed");
  console.log(tasktitle);
}
