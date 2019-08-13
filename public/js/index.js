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
    .then(function(){
        location.reload(true);
    });
});

$(".btn-save").on("click", function(){
    var thisId = $(this).attr("data-id");
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

