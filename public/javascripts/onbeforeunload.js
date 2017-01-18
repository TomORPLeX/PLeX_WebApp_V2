window.onbeforeunload = function() {

    $.ajax({
        type: 'GET',
        async: false,
        url: '/logout'
        });
    return"leaving site";
};
$(document).ready(function() {
    $('a[rel!=ext]').click(function() { window.onbeforeunload = null; });
    $('form').submit(function() { window.onbeforeunload = null; });

});
