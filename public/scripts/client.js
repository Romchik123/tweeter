/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};





const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];





const createTweetElement = (tweetData) => {
  const tweetCreatedAt = timeago.format(tweetData.created_at);

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





const renderTweets = function (data) {
  // takes return value and appends it to the tweets container

  $("#tweets-container").empty();

  for (const iterator of data) {
    const $tweet = createTweetElement(iterator);

    // Test / driver code (temporary)

    $("#tweets-container").prepend($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  }
};





$(document).ready(function () {
  const loadTweets = function () {
    $.ajax("/tweets/", { method: "GET" }).then(function (res) {
      renderTweets(res);
    });
  };

  loadTweets();

  $("#target").submit(function (event) {
    event.preventDefault();

    const result = $(this).find("#tweet-text").val();
    const text = $(this).serialize();

    if (result === "" || result === null) {
      $(".warning-2").hide();
      $(".warning-1").show();
    } else if (result.length > 140) {
      $(".warning-1").hide();
      $(".warning-2").show();
      console.log("hey");
    } else {
      $("#tweet-text").val("");
      $(".counter").val(140);

      $(".warning-1").hide();
      $(".warning-2").hide();
      $.ajax("/tweets/", { method: "POST", data: text }).then(function (res) {
        loadTweets();
      });
    }
  });
});
