$(function() {
  $('.list-container').on('click', '.add-card-button', function(e) {
    console.log("CLICKED");
    $.ajax({
                url: '/main',
                dataType: 'json',
                type: 'POST',
                data: {'deadline':"hiii", 'title':'title', 'desc':'desc', 'associate':'associate', 'group':'group'},
                success: function(result) {
                  colsole.log('OK');
                }
            });
      });

  $('.oscar-button').click(function(e) {
    $('.oscar-chat').show();
    console.log("YEAH");
  });
  $('#close').click(function(e) {
    $('.oscar-chat').hide();
    console.log("YEAH");
  });
});
