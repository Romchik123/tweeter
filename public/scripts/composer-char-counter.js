// eslint-disable-next-line no-undef
$(document).ready(function () {
  // --- our code goes here ---

  $("#tweet-text").on("input", function () {
    let count = $(this).val().length;

    let result = 140 - count;
    $(".counter").text(result);

    $(".counter").removeClass("warning");

    if (result < 0) {
      $(".counter").addClass("warning");
    }
  });
});
