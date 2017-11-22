// var title, desc, associate, group = "";
// var deadline;
// var importance = 1;

$(function() {
  $('#addtask-submit').click(function(e){
    console.log("CLICKED");
    $.ajax({
                url: '/main',
                dataType: 'json',
                type: 'POST',
                data: $('#addtaskform').serializeArray(),
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

                  }
                  else {}
                }
            });
    // console.log($('#addtaskform').serializeArray());
      });



  $('.add-list-button').click(function(e) {
    $('.listmodal').show();
      });

  $('.lmodal').click(function(e){
        $('.listmodal').hide();
    });
  $('#addlist-submit').click(function(e){
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
                    $('.taskmodal').hide();//not working
                  }
                  else {}
                }
            });
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
  });
  $('.modal').click(function(e){
        $('.taskmodal').hide();
    });

  $('.modal-contents').click(function(event){
      event.stopPropagation();
  });
});
