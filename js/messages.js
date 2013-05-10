url = 'https://api.parse.com/1/classes/messages';
chatLength = 0;
friends = {};

$(function(){
  $('#submit-button').click(function(event){
    var text = $('#chat-input')[0].value;
    $('#chat-input')[0].value = '';
    console.log(text);
    sendMessage(text);
  });
  getMessages();
  setInterval(update,300);
});

var getMessages = function() {
  $.ajax(url + '?limit=1000&order=updatedAt', {
    contentType: 'application/json',
    success: function(data){
      displayMessages(data.results);
      chatLength = data.results.length;
      allMessages = data.results; //used for debugging
    },
    error: function(data) {
      console.log('getMessages: ajax request failed');
    }
  });
};

var displayMessages = function(msgs){
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
  var $nameSpan = $('<span class="username"></span>');
  $nameSpan.click(function(event) {
    //toggle friend class of clicked element
    friends[userName] = !friends[userName];
    //select all username nodes and toggle
    _($('.username')).each(function(node) {
      if (friends[node.textContent]) {
        node.classList.add('friend');
      } else {
        node.classList.remove('friend');
      }
    });
  });

  if (friends[userName]) {
    $nameSpan.addClass('friend');
  }

  $nameSpan.text(userName);
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

var sendMessage = function(text) {
  var userName = window.location.search.slice(10);
  $.ajax(url, {
    contentType: 'application/json',
    type: 'POST',
    data: JSON.stringify({
      'username': userName,
      'text': text
    }),
    success: function(data){
      console.log("sendMessage: success");
    },
    error: function(data) {
      console.log("sendMessage: ajax request failed", data);
    }
  });
};

var update = function() {
  $.ajax(url + '?skip=' + chatLength, {
    contentType: 'application/json',
    success: function(data) {
      displayMessages(data.results);
      chatLength += data.results.length;
    },
    error: function(data) {
      console.log('Could not count chat length');
    }
  });
};

