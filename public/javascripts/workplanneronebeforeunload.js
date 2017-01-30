window.onbeforeunload = function() {

    $.ajax({
        type: 'GET',
        async: false,
        url: '/logout'
    });
    return"Do you want to leave this site?" +
         "changes you have made may not be saved.";
};
$(document).ready(function() {
    $('form').submit(function() { window.onbeforeunload = null; });
    $('a[rel!=ext]').click(function() { window.onbeforeunload = function () {
        return"Do you want to leave this site?" +
        "changes you have made may not be saved.";  }});
});