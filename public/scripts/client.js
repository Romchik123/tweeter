/* eslint-disable no-undef */
// Client-side JS logic goes here ::

// Function to avoid malicious attacks ::
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};




// Creating Ajax html tweet element ::
const createTweetElement = (tweetData) => {
  
  // Tweet timer ::
  const tweetCreatedAt = timeago.format(tweetData.created_at);

  // HTML that we are injecting by Ajax ::
  let $tweet = `<section class="created-tweet">
      <div class="icon-header-email">
        <div class="icon-header">
          <img src="${tweetData.user.avatars}">
          <header>${tweetData.user.name}</header>
        </div>
        <div>
          <span>${tweetData.user.handle}</span>
        </div>
      </div>

      <article>
        ${escape(tweetData.content.text)}
      </article>
      <hr />
      <div class="icon-footer">
        <footer>${tweetCreatedAt}</footer>
        <div>
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </div>
    </section>`;

  return $tweet;
};




// Rendering the data to the page ::
const renderTweets = function(data) {
  // takes return value and appends it to the tweets container
  $("#tweets-container").empty();

  for (const iterator of data) {
    const $tweet = createTweetElement(iterator);
    $("#tweets-container").prepend($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  }
};




// Implementing the Ajax and jQuery ::
$(document).ready(function() {

  // Ajax get request ::
  const loadTweets = function() {
    $.ajax("/tweets/", { method: "GET" }).then(function(res) {
      renderTweets(res);
    });
  };

  loadTweets();


  // Ajax, Submitting the post request ::
  $("#target").submit(function(event) {
    event.preventDefault();

    const result = $(this).find("#tweet-text").val();
    const text = $(this).serialize();

    // Conditions for posting the tweets ::
    if (result === "" || result === null) {
      $(".warning-2").hide();
      $(".warning-1").show();
    } else if (result.length > 140) {
      $(".warning-1").hide();
      $(".warning-2").show();
    } else {
      $("#tweet-text").val("");
      $(".counter").val(140);

      $(".warning-1").hide();
      $(".warning-2").hide();
      $.ajax("/tweets/", { method: "POST", data: text }).then(function() {
        loadTweets();
      });
    }
  });
});
