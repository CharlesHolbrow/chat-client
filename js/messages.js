$(function(){
  getMessages();
});

var getMessages = function() {
  $.ajax('https://api.parse.com/1/classes/awesome', {
    contentType: 'application/json',
    success: function(data){
      appendMessages(data.results);
      console.log(data);
      allMessages = data; //used for debugging
    },
    error: function(data) {
      console.log('Ajax request failed');
    }
  });
};

var appendMessages = function(msgs){
  _.each(msgs, function(msg) {
    $('#main').append(parseMessage(msg));
  });
};

var parseMessage = function(msg){
  var $div = $('<div></div>');
  var date = new Date(msg.createdAt);
  $div.text(msg.text);
  var $span = $('<span></span>');
  $span.text(date);
  $div.append($span);
  return $div;
};

var postMessage = function() {
  $.ajax('https://api.parse.com/1/classes/awesome', {
    contentType: 'application/json',
    type: 'POST',
    data: {
      'username': 'You',
      'text': 'All your base are belong to us',
      'roomname': '4chan' // Optional
    },
    success: function(data){
      console.log("successful postMessage");
    },
    error: function(data) {
      console.log('Ajax request failed');
    }
  });
};