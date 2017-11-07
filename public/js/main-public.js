$(function() {
  $('.add-list-button').click(function(e) {
    console.log("CLICKED");
    $.ajax({
                url: '/main',
                dataType: 'json',
                type: 'POST',
                data: {'deadline':"hiii", 'title':'title', 'desc':'desc', 'associate':'associate'},
                success: function(result) {
                  colsole.log('OK');
                }
            });
      });
});
