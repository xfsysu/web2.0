var number;
var word;
var isShowResult;

$('document').ready(function(){
    init();
    $('.apb').click(function(){
        if (isShowResult) {
            reset();
            isShowResult = false;
            randSortNumber();
            for (var i = 0; i < 5; i++) {
                getRandNumber(number[i]);
            }
        }
    });
    $('#button').mouseleave(reset);
});

function init() {
    number = [0, 1, 2, 3, 4];
    word = ['A', 'B', 'C', 'D', 'E'];
    isShowResult = true;
    $('.button').toggleClass('waiting', false);
    $('.unread').text('').hide();
    $('#info-bar').toggleClass('waiting', true);
    $('.page').text('');
}

function randSortNumber() {
    for (var i = 4; i >= 0; i--) {
        var randNumber = Math.floor(Math.random() * i);
        var temp = number[i];
        number[i] = number[randNumber];
        number[randNumber] = temp;
    }
    $('.page').text(word[number[0]] + word[number[1]] + word[number[2]] + word[number[3]] + word[number[4]] )
}

function getRandNumber(index) {
    var buttons = $('.button');
    var buttonClicked = buttons.eq(index);
    var unread = $('.unread', buttonClicked);

    unread.text('...').show();
    $.get('/', function(data){
        unread.text(data);
        buttonClicked.toggleClass('waiting', true);
        if ($('.button.waiting').length === 5) {
            showResult();
        }
    });
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
