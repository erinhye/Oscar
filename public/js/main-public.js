// var title, desc, associate, group = "";
// var deadline;
// var importance = 1;

$(function() {
  $('#addtaskform').on('submit', function(e) {
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
