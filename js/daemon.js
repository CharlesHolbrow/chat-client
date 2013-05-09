//Assume chat length is initialized to zero
//Assume url is initialized
var checkNewChats = function() {
  var getMessages = function() {
    $.ajax(url + '?skip=' + chatLength, { //just count, no results
      contentType: 'application/json',
      success: function(data) {
        updateChats(data.results);
        chatLength += data.results.length;
      },
      error: function(data) {
        console.log('Could not count chat length');
      }
    });
  };
  getMessages();
};
