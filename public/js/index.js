$("#scrape").on("click", function() {
    $.ajax({
        method: "GET",
        url: "/scrape"
    })
    .then(function(data) {
        console.log("data: ", data);
        location.reload(true);
    });
});

$("#clear").on("click", function() {
    $.ajax({
        method: "DELETE",
        url: "/clear"
    })
    .then(function() {
        $.ajax({
            method: "GET",
            url: "/articles"
        })
    });
    location.reload(true);
});

$(".btn-save").on("click", function(){
    const thisId = $(this).attr("data-id");
    $.ajax({
        method: "PUT",
        url: "/saved" + thisId,
        data: {
            saved: true
        }
    })
    .then(function() {
        $.ajax({
            method: "GET",
            url: "/articles"
        })
        .then(function(){
           location.assign("/saved");
        });
    });
});

$(".btn-unsave").on("click", function(){
    const thisId = $(this).attr("data-id");
    $.ajax({
        method: "PUT",
        url: "/unsaved" + thisId,
        data: {
            saved: false
        }
    })
    .then(function() {
        $.ajax({
            method: "GET",
            url: "/articles"
        })
        .then(function(){
           location.reload(true);
        });
    });
});

$(".save-note").on("click", function(){
    const thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/note/" + thisId,
        data: {
            body: $(".noteBody").val()
        }
    })
    .then(function(){
        $.ajax({
            method: "GET",
            url: "/articles"
        })
        .then(function(){
           location.reload(true);
        });
    });
});

$(".delete-note").on("click", function(){
    const thisId = $(this).attr("data-id");
    console.log(thisId);
    $.ajax({
        method: "DELETE",
        url: "/note/" + thisId,
    })
    .then(function() {
        $.ajax({
            method: "GET",
            url: "/articles"
        })
        .then(function(){
           location.reload(true);
        });
    });
});

