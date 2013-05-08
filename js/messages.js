$(function(){
  $.ajax('https://api.parse.com/1/classes/messages', {
    contentType: 'application/json',
    success: function(data){
      appendMessage(data.results[1]);
      console.log(data);
      allMessages = data; //used for debugging
    },
    error: function(data) {
      console.log('Ajax request failed');
    }
  });
});


var appendMessage = function(msg){
  $('#main').append(parseMessage(msg));
};

var parseMessage = function(msg){
  var $div = $('<div></div>');
  $div.text(msg.text);
  return $div;
};