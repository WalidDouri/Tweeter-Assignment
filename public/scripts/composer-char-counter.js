$(document).ready(function() {
  $("#tweet-input").on("input", function(events) {
      let inputLength = events.target.value.length;
      let charLeft = 140 - inputLength
      $("#counter").text(charLeft);
      if (inputLength > 140) {
          $("#counter").css('color', 'red')
      } else {
          $("#counter").css("color", "black");
      }
  });

});