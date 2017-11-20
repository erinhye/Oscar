window.onload= function () {
  var objDiv = document.getElementsByClassName("chat-container")[0];
  objDiv.scrollTop = objDiv.scrollHeight;
  randomPos();

}

function ScrollToBottom() {
  var objDiv = document.getElementsByClassName("chat-container")[0];
  objDiv.scrollTop = objDiv.scrollHeight;
}
// window.scrollTo(0,document.querySelector(".chat-container").scrollHeight);

function css(selector, property, value) {
    for (var i=0; i<document.styleSheets.length;i++) {//Loop through all styles
        //Try add rule
        try { document.styleSheets[i].insertRule(selector+ ' {'+property+':'+value+'}', document.styleSheets[i].cssRules.length);
        } catch(err) {try { document.styleSheets[i].addRule(selector, property+':'+value);} catch(err) {}}//IE
    }
}

function red() {
  var bg = document.getElementsByTagName("body");
  var footer = document.getElementById("footer-container");
  var bubble = document.getElementsByClassName("oscar-chats");

  // bg[0].style.backgroundColor = "#F7F7F7";
  footer.style.backgroundColor = "#FF002F";

  css('#footer-container', 'background-color', '#FF002F')

  // for (var i = 0; i < bubble.length; i++)
  // {
  //   bubble[i].style.color = "#FF0051";
  // }
  // css('.oscar-chats', 'color', '#FF0051')


}

function green() {
  var bg = document.getElementsByTagName("body");
  var footer = document.getElementById("footer-container");
  var bubble = document.getElementsByClassName("oscar-chats");

  // bg[0].style.backgroundColor = "#F7F7F7";
  footer.style.backgroundColor = "#0EC000";

  css('#footer-container', 'background-color', '#0EC000')


  // for (var i = 0; i < bubble.length; i++)
  // {
  //   bubble[i].style.color = "#11A505";
  // }
  // css('.oscar-chats', 'color', '#11A505')


}

function white() {
  var bg = document.getElementsByTagName("body");
  var footer = document.getElementById("footer-container");
  var bubble = document.getElementsByClassName("oscar-chats");

  // bg[0].style.backgroundColor = "#F7F7F7";
  footer.style.backgroundColor = "#9570FF";

  css('#footer-container', 'background-color', '#9570FF')



  // for (var i = 0; i < bubble.length; i++)
  // {
  //   bubble[i].style.color = "#6D3CFB";
  // }
  // css('.oscar-chats', 'color', '#6D3CFB')


}

function randomPos() {

  var emoji = document.getElementsByClassName("emoji");


  for (var i = 0; i < emoji.length; i++) {
    var height = Math.floor(Math.random() * 65) + 5; /*5 to 70*/

    var left = Math.floor(Math.random() * 11) + 1; /*0 to 10*/

    var right = Math.floor(Math.random() * 11) + 85; /*80 to 90*/

    var rand = Math.floor(Math.random() * 2) + 1;
    console.log(rand);
    if (rand == 1) {
      emoji[i].style.left = left+"vw";
    }
    else {
      emoji[i].style.left = right+"vw";
    }
    emoji[i].style.top = height+"vh";
  }



}
