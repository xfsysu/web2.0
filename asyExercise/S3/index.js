var isShowResult = true;

$('document').ready(function(){
    init();
    $('.apb').click(function(){
        if (isShowResult) {
            isShowResult = false;
            reset();
            getRandNumber(0);
        }
    });
    $('#button').mouseleave(reset);
});

function init() {
    $('.button').toggleClass('waiting', false);
    $('.unread').text('').hide();
    $('#info-bar').toggleClass('waiting', true);
    $('.page').text('');
}

function getRandNumber(index) {
    var buttons = $('.button');
    var buttonClicked = buttons.eq(index);
    var unread = $('.unread', buttonClicked);

    buttons.toggleClass('waiting', true);
    buttonClicked.toggleClass('waiting', false);
    unread.show().text('...');
    $.get('/', function(data){
        unread.text(data);
        buttons.each(function(i){
            buttons.eq(i).toggleClass('waiting', $('.unread', buttons.eq(i)).is(':visible'));//指定的button是否处于灭活状态
        });
        if (index == 5) {
            showResult();
        }
    });
    if (index <= 4) {
        getRandNumber(index + 1);
    }
}

function showResult() {
    isShowResult = true;
    var result = 0;

    for (var i = 0; i < 5; i++) {
        result += parseInt($('.unread').eq(i).text());
    }
    $('.page').text(result.toString());
    $('.button').toggleClass('waiting', false);
}

function reset() {
    for (var i = 0; i < 5; i++) {
        if ($('.unread').eq(i).text() === '...') return;
    }
    init();
}
