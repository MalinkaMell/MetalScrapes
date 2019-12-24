$(document).ready(function () {

  $(".spinners").hide();

  $(".favorites").on("click", function () {
    //console.log($(this).data("id"));
    $("#alert-modal").modal("show");
    $("#modal-message").text("Added to favorites!");
    let id = { _id: $(this).data("id") };
    console.log(id);

    $.ajax({
      method: "PUT",
      url: "/",
      data: id
    })
      .then(function (data) {
        console.log(data);
      })
  });


  $(".comments").on("click", function () {
    $(".form-message").empty();
    $("#textarea").val("");
    $("#form-modal").modal("show"); 
    $("#form-modal-label").text("Notes For Article: " + $(this).data("id"));
    $("#form-modal-label-hidden").text($(this).data("id"));
    $.ajax({
      method: "GET",
      url: "/articles/" + $(this).data("id")
    })
    .then(function(data) {
      // If there's a note in the article
      if (data.note) {
        data.note.forEach(element => {
          let dateContainer = $("<div>");
          dateContainer.attr("class", "text-right text-underline font-italic");
          dateContainer.text(element.createdOn);
          $(".form-message").prepend(element.text);
          $(".form-message").prepend(dateContainer);
          $(".form-message").prepend("<hr>");
        });
      }
    });
  });

  $("#form-send").on("click", function () {
    const data = {
      text: $("#textarea").val()
    }
    console.log(data);
    $.post({
      url: "/articles/" + $("#form-modal-label-hidden").text(),
      data: data
    })
    .then(function () {
      $(".form-message").empty();
      $("#textarea").val("");
      $.ajax({
        method: "GET",
        url: "/articles/" + $("#form-modal-label-hidden").text()
      })
      .then(function(data) {
        // If there's a note in the article
        if (data.note) {
          data.note.forEach(element => {
            let dateContainer = $("<div>");
            dateContainer.attr("class", "text-right text-underline font-italic");
            dateContainer.text(element.createdOn);
            $(".form-message").prepend(element.text);
            $(".form-message").prepend(dateContainer);
            $(".form-message").prepend("<hr>");
          });
        }
      });
    })
  });

  $(".unlike").on("click", function () {
    let id = { id: $(this).data("id") };
    console.log(id);

    $.ajax({
      method: "PUT",
      url: "/favorites/" + $(this).data("id"),
      data: id
    })
      .then(function (data) {
        console.log("==========");
        console.log(data);
        console.log("==========");
      })
  });

  $("#modal-close").on("click", function () {
    $("#alert-modal").modal("hide");
    location.reload();
  });

  $("#modal-favorites").on("click", function () {
    location.href = "/favorites";
  });

  $("#scrape").on("click", function () {
    $("#title").hide();
    $(".spinners").show();
    $("#scraping-msg").text("Scraping new articles, please wait");
  });

  $("#delete").on("click", function () {
    $.ajax({
      url: "/",
      type: "DELETE"
    })
    $("#title").hide();
    $(".spinners").show();
    $("#scraping-msg").text("Deleting everything from database");
  });

});