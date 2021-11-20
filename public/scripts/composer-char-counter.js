$(document).ready(function() {
  // --- our code goes here ---
    $( "#tweet-input" ).on("input", function(events) {
    let inputLength = events.target.value.length;
    let charLeft = 140 - inputLength
    //console.log(events.target);
    $("#counter").text (charLeft);  

      //console.loe(charLeft);
      // if(charLeft > 140) {
      //   $( ".counter") // change colour in here? not a requirement I believe.


      // }
  });

}); 


//https://stackoverflow.com/questions/38019685/finding-length-of-event-target-name-value-in-meteorjs