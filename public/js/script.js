$(function() {
  var newList = `
  <div class="list list-dimension group">
    <div class = "group-title">Interaction Design</div>
    <ul class="list-inner-scroll">
      </ul>
      <button class="add-card-button">Add a card...</button>
    </div>
  `;

  var newCard = `<li class="list-item">
    <div class = "prioritized c"></div>
    <h2>29th, Oct, 2017</h2>
    <h3>Interaction design With @Darci lynne</h3>
  </li>`

  // $('.add-list-button').click(function(e) {
  //   var $newList = $(newList);
  //   $('.list-container').find('.list').last().after($newList);
  // });

  // $('.list-container').on('click', '.add-card-button', function(e) {
  //   var $target = $(e.target);
  //   var $list = $target.parent('.list');
  //   addCardToList($list);
  // });
  //
  // function addCardToList($list) {
  //   var $newCard = $(newCard);
  //   $list.find('.list-inner-scroll').prepend($newCard);
  //   $newCard.focus();
  // }
});
