
$(document).ready(function () {
  //localStorage.clear(); 
  localStorage.getItem("color") && $("#colorstyle").attr("href", `/css/${localStorage.getItem("color")}.css`);

  $("#colorselect").on("change", function () {


    let color = this.value;

    localStorage.setItem("color", color);

    let currentColor = localStorage.getItem("color");

    this.value === currentColor && $("#colorstyle").attr("href", `/css/${currentColor}.css`);
  })


  $(".spinners").hide();
  $("#scroll-to-top").hide();



  $(window).scroll(function () {
    if ($("html").scrollTop() > 400) {
      $('#scroll-to-top').fadeIn();
    } else {
      $('#scroll-to-top').fadeOut();
    }
  });

  $("#scroll-to-top").on("click", function () {
    $("html").animate({ scrollTop: 0 }, "slow");
  })

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
      .then(function (data) {
        // If there's a note in the article
        if (data.note) {
          data.note.forEach(element => {
            let flexContainer = $("<div>");
            flexContainer.attr("class", "d-flex justify-content-between align-items-center")
            let dateContainer = $("<div>");
            let deleteBtn = $("<button>");
            deleteBtn.text("x");
            deleteBtn.attr("class", "text-left btn btn-sm btn-indigo-dark-outline nunito delete-comment");
            deleteBtn.attr("data-id", element._id);
            dateContainer.attr("class", "text-right text-underline font-italic");
            dateContainer.text(moment.utc(element.createdOn).format("lll"));
            $(".form-message").prepend(element.text);
            $(".form-message").prepend(flexContainer);
            flexContainer.append(deleteBtn);
            flexContainer.append(dateContainer);
            $(".form-message").prepend("<hr>");
          });
        }
      });
  });

  $("body").on("click", ".delete-comment", function () {
    let id = $(this).attr("data-id")
    $.ajax({
      url: "/notes/" + id,
      type: "DELETE"
    })
      .then(function () {
        $("#form-modal").modal("hide");
        $("#alert-modal").modal("show");
        $("#modal-favorites").hide();
        $("#modal-message").text(`Comment #${id} has been deleted`);
      })
  })

  $("#form-send").on("click", function () {
    if ($("#textarea").val().length < 10) {
      $(".textarea-helper").text("Your comment have to be at least 10 characters long");
    } else {
      $(".textarea-helper").empty();

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
            .then(function (data) {
              // If there's a note in the article
              if (data.note) {
                data.note.forEach(element => {
                  let dateContainer = $("<div>");
                  dateContainer.attr("class", "text-right text-underline font-italic");
                  dateContainer.text(moment.utc(element.createdOn).format("lll"));
                  $(".form-message").prepend(element.text);
                  $(".form-message").prepend(dateContainer);
                  $(".form-message").prepend("<hr>");
                });
              }
            });
        })
    }

  });

  $(".unlike").on("click", function () {
    let id = { id: $(this).data("id") };
    $.ajax({
      method: "PUT",
      url: "/favorites/" + $(this).data("id"),
      data: id
    }).then(function () {
      location.reload();
    })
  });

  $("#modal-close").on("click", function () {
    $("#alert-modal").modal("hide");
    location.reload();
  });

  $("#modal-favorites").on("click", function () {
    location.href = "/favorites";
  });

  $("#form-cancel").on("click", function () {
    $("#textarea").val("");
  });

  $("#scrape").on("click", function () {
    $("html").animate({ scrollTop: 0 }, "slow");
    $("#title").hide();
    $(".spinners").show();
    $("#scraping-msg").text("Scraping new articles, please wait");
  });

  $("#delete").on("click", function () {
    $.ajax({
      url: "/",
      type: "DELETE"
    })
    $("html").animate({ scrollTop: 0 }, "slow");
    $("#title").hide();
    $(".spinners").show();
    $("#scraping-msg").text("Deleting everything from database");
  });


  $(".date").each(function (index, value) {
    let val = $(value).text();
    $(this).text(moment.utc(val).format("lll"));
  })
});