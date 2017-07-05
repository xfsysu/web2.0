$('document').ready(function(){
	init();
	$('.button').each(function(index){
		$('.button').eq(index).click(function(){
			getRandNumber(index);
		});
	});
	$('#button').mouseleave(reset);
	$('#info-bar').click(showResult);
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
	var unread = $('.unread', buttonClicked);//buttonCLicked.unread

	if (!buttonClicked.hasClass('waiting') && unread.text() !== '...') {//当前所点击的是激活状态且不是在发送请求
		buttons.toggleClass('waiting',true);
		buttonClicked.toggleClass('waiting', false);
		unread.show();
		unread.text('...');
		$.get('ajax', function(data){
			unread.text(data);
			buttons.each(function(i){
				buttons.eq(i).toggleClass('waiting', $('.unread', buttons.eq(i)).is(':visible'));
			});
			if ($('.unread:visible').length === 5) {
				$('#info-bar').toggleClass('waiting', false);
			}
		});
	}
}

function showResult() {
	if (!$('#info-bar').hasClass('waiting')) {
		var result = 0;

		for (var i = 0; i < 5; i++) {
			result += parseInt($('.unread').eq(i).text());
		}
		$('.page').text(result.toString());
		$('#info-bar').toggleClass('waiting', true);
		$(".button").toggleClass('waiting', false);
	}
}

function reset() {
	init();
}

