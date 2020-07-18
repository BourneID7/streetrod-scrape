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
            url: "/"
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
            url: "/"
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
            url: "/saved"
        })
        .then(function(){
           location.reload(true);
        });
    });
});

$(".save-note").on("click", function(){
    const thisId = $(this).attr("data-id");
    const body = $(this).closest("div").find(".noteBody").val();
    console.log("body: ", body);
    $.ajax({
        method: "POST",
        url: "/note/" + thisId,
        data: {
            body: body
        }
    })
    .then(function(){
        $.ajax({
            method: "GET",
            url: "/saved"
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
            url: "/saved"
        })
        .then(function(){
           location.reload(true);
        });
    });
});

