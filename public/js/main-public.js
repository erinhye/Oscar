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
                      <div class = "group-title">`+result['name']+`</div>
                      <ul class="list-inner-scroll">
                        </ul>
                        <button class="add-card-button">Add a card...</button>
                      </div>
                    `;

                    var $newList = $(newList);
                    $('.list-container').find('.list').last().after($newList);
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
