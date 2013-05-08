url = 'https://api.parse.com/1/classes/messages';

$(function(){
  $('#submit-button').click(function(event){
    console.log('Do it');
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
  var $div = $('<div></div>');
  var date = new Date(msg.createdAt);
  $div.text(msg.text);
  var $span = $('<span></span>');
  $span.text(date);
  $div.append($span);
  return $div;
};

var postMessage = function() {
  $.ajax(url, {
    contentType: 'application/json',
    type: 'POST',
    data: JSON.stringify({
      'username': 'Your Mother',
      'text': 'All your base are belong to us'
    }),
    success: function(data){
      console.log("successful postMessage");
    },
    error: function(data) {
      console.log('Ajax request failed', data);
    }
  });
};
