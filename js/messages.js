url = 'https://api.parse.com/1/classes/messages';
chatLength = 0;

$(function(){
  $('#submit-button').click(function(event){
    var text = $('#chat-input')[0].value;
    console.log(text);
    postMessage(text);
  });
  getMessages();
  //add setinterval
});

var getMessages = function() {
  $.ajax(url + '?limit=1000&order=updatedAt', {
    contentType: 'application/json',
    success: function(data){
      updateChats(data.results);
      chatLength = data.results.length;
      allMessages = data.results; //used for debugging
    },
    error: function(data) {
      console.log('Ajax request failed');
    }
  });
};

var updateChats = function(msgs){
  _.each(msgs, function(msg) {
    $('#chat').prepend(parseMessage(msg));
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
