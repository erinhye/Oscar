var newList = `
<div class="list list-dimension">
    <h1 class="list-header" contenteditable>New list</h1>
    <ul class="list-inner-scroll">
    </ul>
    <button class="add-card-button">Add a card...</button>
  </div>
`;

var newCard = `<li class="list-item" contenteditable></li>`

$('.add-list-button').click(function(e) {
  var $newList = $(newList);
  $('.list-container').find('.list').last().after($newList);
});

$('.list-container').on('click', '.add-card-button', function(e) {
  var $target = $(e.target);
  var $list = $target.parent('.list');
  addCardToList($list);
});

function addCardToList($list) {
  var $newCard = $(newCard);
  $list.find('.list-inner-scroll').append($newCard);
  $newCard.focus();
}
