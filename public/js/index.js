$(document).ready(function () {
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
  $("#modal-close").on("click", function() {
    $("#alert-modal").modal("show");
    location.reload();
  });

  $("#modal-favorites").on("click", function() {
    location.href= "/favorites";
  });
});