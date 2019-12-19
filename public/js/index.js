$(document).ready(function () {

  $(".spinners").hide();

  $(".favorites").on("click", function () {
    //console.log($(this).data("id"));
    $("#alert-modal").modal("show");
    $("#modal-message").text("Added to favorites!");
    let id = { articleId: $(this).data("id") };
    $.ajax({
      method: "POST",
      url: "/",
      data: id
    })
      .then(function (data) {
        console.log(data);
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
    $("#alert-modal").modal("show");
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

  $("#delete").on("click", function() {
    $.ajax({
      url: "/",
      type: "DELETE"
    })
    $("#title").hide();
    $(".spinners").show();
    $("#scraping-msg").text("Deleting everything from database");
  });
  
});