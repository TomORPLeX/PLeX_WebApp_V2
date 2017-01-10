window.onbeforeunload = function() {

    $.ajax({
        type: 'GET',
        async: false,
        url: '/close'
        });
    return"leaving site";
};
$(document).ready(function() {
    $('a[rel!=ext]').click(function() { window.onbeforeunload = null; });
    $('form').submit(function() { window.onbeforeunload = null; });

});
