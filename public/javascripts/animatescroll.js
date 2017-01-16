function scrollacross() {
    console.log('animating scroll!');

    var container_width = 3000 * $(".tablecontainer input").length;
    $(".tablecontainer").css("width", container_width);

    //document.getElementById('scrollable').scrollRight += 100;
}