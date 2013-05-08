url = 'https://api.parse.com/1/classes/messages';

$(function(){
  $('#submit-button').click(function(event){
    var text = $('#chat-input')[0].value;
    console.log(text);
    postMessage(text);
  });
  getMessages();
});

var getMessages = function() {
  $.ajax(url + '?limit=1000', {
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
  msgs.reverse();
  _.each(msgs, function(msg) {
    $('#main').append(parseMessage(msg));
  });
};

var parseMessage = function(msg){
  // make a div for the message
  var $div = $('<div></div>');
  var date = new Date(msg.createdAt);

  // add the username
  var userName = msg.username;
  var $nameSpan = $('<span></span>');
  $nameSpan.text(userName + ':  ');
  $div.append($nameSpan);

  // add the message text
  var $textSpan = $('<span></span>');
  $textSpan.text(msg.text);
  $div.append($textSpan);

  // add the date
  var $span = $('<span></span>');
  $span.text(date);
  $div.append($span);

  return $div;
};

var postMessage = function(text) {
  var userName = window.location.search.slice(10);
  $.ajax(url, {
    contentType: 'application/json',
    type: 'POST',
    data: JSON.stringify({
      'username': userName,
      'text': text
    }),
    success: function(data){
      console.log("successful postMessage");
    },
    error: function(data) {
      console.log('Ajax request failed', data);
    }
  });
};
