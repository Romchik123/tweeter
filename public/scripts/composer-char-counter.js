/* eslint-disable no-undef */


// jQuery ready function ::
$(document).ready(function() {

  // Tweeter characters counter ::
  $("#tweet-text").on("input", function() {
    let count = $(this).val().length;

    // Counting backwards ::
    let result = 140 - count;
    $(".counter").text(result);

    $(".counter").removeClass("warning");

    // If amount of characters exceeds -1 it will be colored in red ::
    if (result < 0) {
      $(".counter").addClass("warning");
    }
  });
});
