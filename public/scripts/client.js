// same thing as $(document).ready(function() {
  $(() => {
    // renders tweets via ajax page
    const renderRecentTweet = function(tweet) {
        $('tweet-container').prepend(createTweetElement(tweet));
    };

    const createTweetElement = function(tweet) {
        return `
      <article class="tweet-feed-box">
        
        <div class="tweet-header">
          <div class="sub-tweet-header">
            <img class="tweet-icon"  src=${tweet.user.avatars}>
            <p> ${tweet.user.name}</p>
         </div> 
          <p> ${tweet.user.handle}</p>
        </div>
        
        <div class="tweet-message"> 
          <p>${escape(tweet.content.text)}</p>
        </div>

        <div class="tweet-footer">
            <p>${timeago.format(tweet.created_at)}</p>
          <div>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fas fa-cookie-bite"></i>
          </div>
        </div>

      </article>
    `;
    }

    $("#post-tweet").on('submit', (event) => {
        event.preventDefault();
        const data = $("#form").serialize();
        const $tweetText = $("#tweet-input").val();
        if ($tweetText.length > 140) {
            console.log("PEAR:",$tweetText.length);
            console.log("Orange:",$tweetText);
            console.log("Pizza:",$("#tweet-input").val().length);
            $(".error-counter").slideDown("fast","linear");
            return
        }
        if ($tweetText === "" || $tweetText === null) {
            console.log("APPLE:",$(".error-empty"));
            $(".error-empty").slideDown("fast","linear");
            return
        } else {
            $.ajax({
                method: 'POST',
                url: '/tweets/',
                data: data,
            })
                .then(function () {
                    $("#tweet-container").empty();
                    $("#tweet-input").val("");
                    $("#counter").text("140");
                    loadTweets();
                })
        }
    });

    const renderTweets = function (tweets) {
        for (let tweet of tweets) {
            const value = createTweetElement(tweet);
            $('#tweet-container').prepend(value);
        }
    }

    const loadTweets = function() {
        $.ajax('/tweets', { method: 'GET' })
            .then(function(tweet) {
                renderTweets(tweet);
            });
    };

    loadTweets();

    const escape = function (str) {
        let div = document.createElement("div");
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    };

});
