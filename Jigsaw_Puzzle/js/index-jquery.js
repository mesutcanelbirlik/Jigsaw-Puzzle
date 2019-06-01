$(document).ready(function () {
    $('body').css('background-image', 'url("images/background/back.png")');
    $('.slider-image').each(function () {
        $(this).click(function () {
            $("#exampleModalLong").modal();
        });
    });
    $('#next').click(function () {
        if ($('input[name=options]:checked').val() == 1) {
            $("#option1Modal").modal();
        } else if ($('input[name=options]:checked').val() == 2) {
            $("#option2Modal").modal();
        }
    });
    $('#start1').click(function () {
        localStorage.setItem("imgPath", $('.active img:first').attr('src'));
        localStorage.setItem("piecesNumber", $('input[name=options]:checked').val());
        localStorage.setItem("timerValue", $('.form-control option:selected').val());
        window.open("game.html", "_self");
    });
    $('#start2').click(function () {
        localStorage.setItem("imgPath", $('.active img:first').attr('src'));
        localStorage.setItem("backImg", $('input[name=options]:checked').val());
        window.open("game2.html", "_self");
    });
});