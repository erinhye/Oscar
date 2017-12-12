// var title, desc, associate, group = "";
// var deadline;
// var importance = 1;
var now;
var nowId;

$(function() {
  $('#addtask-submit').click(function(e){
    console.log("CLICKED");
    console.log(nowId);
    // e.preventDefault();
    var tasktitle     = $('#tasktitle').val();
    var taskdeadline     = $('#taskdeadline').val();

    if(tasktitle && taskdeadline){

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
                      console.log(document.getElementById(result['task']['group']).parentElement.getElementsByClassName('list-inner-scroll')[0].getElementsByClassName('list-item')[0]);//OMG IT works
                      var location = document.getElementById(result['task']['group']).parentElement.getElementsByClassName('list-inner-scroll')[0].getElementsByClassName('list-item')[0];


                    var newCard = `<li class="list-item">
                      <div class = "prioritized `+result['task']['importance']+`"></div>
                      <h2>`+result['task']['dlday']+`, `+result['task']['dlmonth']+`, `+result['task']['dlyear']+`</h2>
                      <br/>
                      <h3>`+result['task']['title']+` With @`+result['task']['associate']+`</h3>
                    </li>`

                    var $newCard = $(newCard);
                    $('#' + result['task']['group'] + ' + .list-inner-scroll').last().prepend($newCard);
                    // console.log();

                    // location.prepend($newCard);


                    $('.taskmodal').hide();//maybe working
                    $('#addtaskform')[0].reset();

                    }
                    else {}
                  }
              });
            }
    // console.log($('#addtaskform').serializeArray());
      });

      function addCardToList($list) {
        var $newCard = $(newCard);
        $list.find('.list-inner-scroll').prepend($newCard);
        $newCard.focus();
      }



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
