$(document).ready(function () {
    $('#preview-off').prop('disabled', true);
    $('body').css('background-image', 'url("images/background/light.png")');
    $('.options').each(function(){
        $(this).click(function(){
            var src = $(this).attr("src");
            $('html, body').css('background-image', 'url('+src+')');
            $('.options').removeClass("selected");
            $(this).addClass("selected");
        });
    });
    $('#preview-on').click(function(){
        $('#image').css('opacity', '0.3');
        $(this).prop('disabled', true);
        $('#preview-off').prop('disabled', false);
    });
    $('#preview-off').click(function(){
        $('#image').css('opacity', '0');
        $(this).prop('disabled', true);
        $('#preview-on').prop('disabled', false);
    });
    $('.shuffle').click(function(){
        $(this).prop('disabled', true);
    });
});