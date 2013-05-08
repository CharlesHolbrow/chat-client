$(function(){
  $.ajax('https://api.parse.com/1/classes/messages', {
    contentType: 'application/json',
    success: function(data){
      $('#main').append(data.results[1].username);
      console.log(data);
      allMessages = data;
    },
    error: function(data) {
      console.log('Ajax request failed');
    }
  });
});


var appendMessages = function(msg){
  $('#main').append(msg.text);
};