// var title, desc, associate, group = "";
// var deadline;
// var importance = 1;
var now;
var nowId;

$(function() {
  $('#addtask-submit').click(function(e){
    console.log("CLICKED");
    console.log(nowId);
    e.preventDefault();
    var tasktitle     = $('#tasktitle').val();
    var taskdescription    = $('#taskdescription').val();
    var taskassociate     = $('#taskassociate').val();
    var taskdeadline     = $('#taskdeadline').val();
    var taskimportance     = $('#taskimportance').val();

    if(tasktitle && taskdescription && taskassociate && taskdeadline && taskimportance){

      var data = $('#addtaskform').serializeArray();
      data.push({name: 'group', value: nowId});

      $.ajax({
                  url: '/main',
                  dataType: 'json',
                  type: 'POST',
                  data: data,
                  success: function(result) {
                    console.log('OK');
                    if ( result['result'] == true ) {
                      console.log(result['task']['importance']);
                      console.log(result['task']['group']);
                      console.log(document.getElementById(result['task']['group']));//OMG IT works

                    var newCard = `<li class="list-item">
                      <div class = "prioritized c"></div>
                      <h2>29th, Oct, 2017</h2>
                      <h3>Interaction design With @Darci lynne</h3>
                    </li>`


                    $('.taskmodal').hide();//maybe working
                    $('#addtaskform')[0].reset();

                    }
                    else {}
                  }
              });
            }
    // console.log($('#addtaskform').serializeArray());
      });



  $('.add-list-button').click(function(e) {
    $('.listmodal').show();
      });

  $('.lmodal').click(function(e){
        $('.listmodal').hide();
    });
  $('#addlist-submit').click(function(e){

    e.preventDefault();
    var groupname     = $('#groupname').val();
    if(groupname){

      $.ajax({
                  url: '/addgroup',
                  dataType: 'json',
                  type: 'POST',
                  data: $('#addlistform').serializeArray(),
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
    // var $newList = $(newList);
    // $('.list-container').find('.list').last().after($newList);

  });

  $('.oscar-button').click(function(e) {
    $('.oscar-chat').show();
    console.log("YEAH");
  });
  $('#close').click(function(e) {
    $('.oscar-chat').hide();
    console.log("YEAH");
  });

  $('.list-container').on('click', '.add-card-button', function(e) {
    $('.taskmodal').show();
    now = event.target;
    console.log(now.parentElement.getElementsByClassName('group-title')[0].id);
    nowId = now.parentElement.getElementsByClassName('group-title')[0].id;
  });
  $('.modal').click(function(e){
        $('.taskmodal').hide();
    });

  $('.modal-contents').click(function(event){
      event.stopPropagation();
  });
});
