//var isShowResult = true;
var std = {
    ajaxRunning : false,
    abort : false
};

$('document').ready(function(){
    init();
    /*$('.apb').click(function(){
        if (isShowResult) {
            isShowResult = false;
            init();
            getRandNumber(0);
        }
    });*/
    for (var i = 0; i < 5; i++) {
        (function(i){
            $(".button").eq(i).click(function(){
                getRandNumber(i);
            });
        })(i);
    }
    $('.apb:eq(0)').click(autoClick);
    $('#button').mouseleave(reset);
});

function init() {
    $('.button').toggleClass('waiting', false);
    $('.unread').text('').hide();
    $('#info-bar').toggleClass('waiting', true);
    $('.page').text('');
}

function autoClick() {
    for (var i = 0; i < 5; i++) {
        getRandNumber(i, autoClick);
    }
    showResult();
}

function getRandNumber(index, callback) {
    var buttons = $('.button');
    var buttonClicked = buttons.eq(index);
    var unread = $('.unread', buttonClicked);

    if (!buttonClicked.hasClass('waiting') && unread.text() !== '...') {
        std.ajaxRunning = true;
        buttons.toggleClass('waiting', true);
        buttonClicked.toggleClass('waiting', false);
        unread.show().text('...');
        $.get('ajax', function(data){
            std.ajaxRunning = false;
            if (!std.abort) {
                unread.text(data);
                buttons.each(function(i){
                buttons.eq(i).toggleClass('waiting', $('.unread', buttons.eq(i)).is(':visible'));
                });
                if ($('.unread:visible').length === 5) {//可见的红圈的个数是否达到五个
                    $('#info-bar').toggleClass('waiting', false);
                }
                if (typeof callback !== 'undefined') {
                    if (index < 5) {
                        callback();
                    }
                }
            }
            std.abort = false;
        });
    }
}

function showResult() {
    if (!$('#info-bar').hasClass('waiting')) {
        isShowResult = true;
        var result = 0;

        for (var i = 0; i < 5; i++) {
            result += parseInt($('.unread').eq(i).text());
        }
        $('.page').text(result.toString());
        $('.button').toggleClass('waiting', false);
        $('#info-bar').toggleClass('waiting', true);
    }
}

function reset() {
    //if ($('.unread:visible').length !== 5) return;
    if (std.ajaxRunning) {
        std.abort = true;
        std.ajaxRunning = false;
    }
    init();
}