// same thing as $(document).ready(function() {
$(() => {
  // renders tweets via ajax page
  const renderRecentTweet = function(tweet) {
    $('tweet-container').prepend(createTweetElement(tweet));
  };

  const createTweetElement = function(tweet) {
    return `
      <article>
        
        <div class="tweet-header">
          <img class="tweet-icon"  src=${tweet.user.avatars}>
          <p> ${tweet.user.name}</p>
          <p> ${tweet.user.handle}</p>
        </div>
        
        <div class="tweet-message"> 
          <p>${escape(tweet.content.text)}</p>
        </div>

        <div class="tweet-footer">
            <p>${tweet.created_at}</p>
            <p>Icon1</p>
            <p>Icon2</p>
            <p>Icon3</p>
        </div>

      </article>
    `;
  } 
  
    // add the ID to html attributes via form
  //target.addEventListener(type, listener);
  $("#post-tweet").on('submit', (event) => {
      event.preventDefault();
      const data = $("#form").serialize();
      const $tweetText = $("#tweet-input").val();
      if ($tweetText.length > 5) {
        console.log("PEAR:",$tweetText.length);
        console.log("Orange:",$tweetText);
        console.log("Pizza:",$("#tweet-input").val().length);
        // console.log("here:",val.length);
         $(".error-counter").slideDown("fast","linear");
         return
        //return alert('To many characters my friend!')
      } 
      if ($tweetText === "" || $tweetText === null) {
        console.log("APPLE:",$(".error-empty"));
         $(".error-empty").slideDown("fast","linear");
         return
        //return alert('You must enter something in the field to tweet!')
      } else {
      $.ajax({
        method: 'POST',
        url: '/tweets/',
        data: data,
        // datatype: 'JSON'
      })
      .then(function () {
        $("#tweet-container").empty();
        $("#tweet-input").val("");
        $("#counter").text("140");
        loadTweets();
      })
      }
  });

  //HTML reference L75/L77
  // $(selector).slideDown(speed,easing,callback)
  // .error("error-counter").slideDown("fast","linear")
  //.error("error-empty").slideDown("fast","linear")
  


    const renderTweets = function (tweets) {
        for (let tweet of tweets) {
          const value = createTweetElement(tweet);
          //console.log(value);
          $('#tweet-container').prepend(value);
        }
    }

    const loadTweets = function() {
      $.ajax('/tweets', { method: 'GET' })
      .then(function(tweet) {
        renderTweets(tweet);
       //console.log("here")
      });
    };

    loadTweets();

    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    
  });
  
  
  
  // $.post( "/tweets/", function(data) {
  //   console.log(data);
  // });