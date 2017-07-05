var startOrStop = 0;//0代表第一次开始，1代表处于暂停，2代表游戏进行中
var time, score;
var mole;
var timeReturn;

window.onload = function() {
	createMole();
	$("#start").click(function() {
		startGame();
	})
	$(".mole").click(function() {
		hit(this);
	})
}

function createMole() {
	_.times(60, function(i) {
		$("#ground").append("<button class='mole'></button>");
		if ((i + 1) % 10 == 0 && i != 59) {
			$("#ground").append("<br>");
		}
	});
}

function startGame() {
	if (startOrStop == 0) {//刚开始游戏
		initilization();
		start();
	}
	else if (startOrStop == 1) {//处于暂停状态，点击开始
		start();
	}
	else {//处于游戏状态，点击按钮
		stop();
		startOrStop = 1;
	}
}

function initilization() {
	time = 30;
	score = 0;
	$("#timeCount").val(time + 's');
	$("#scoreCount").val(score);
}

function start() {
	timeReturn = setInterval(timeFuntion, 1000);
	if (startOrStop == 0) {
		mole = _.random(0, 59);
		$("button").eq(mole).addClass("activeMole").removeClass("mole");
	}
	$("#start").val("Stop")
	$("#state").val("Playing..");
	startOrStop = 2;
}

function timeFuntion() {
	time--;
	$("#timeCount").val(time + 's');
	if (time < 0) {//Game over
		end();
	}
}

function end() {
		$("#timeCount").val("30s");
		$("#state").val("Game Over");
		$("#start").val('Start Game');
		$("#scoreCount").val("0");
		$("button").eq(mole).removeClass("activeMole").addClass("mole");
		alert("Game Over\nYour scores:" + score);
		clearTimeout(timeReturn);
		startOrStop = 0;
}

function hit(currentButton) {
	if (startOrStop == 2) {//game valid only start
		if (currentButton.className == "mole") {
			score--;
		}
		else {
			score++;
			$("button").eq(mole).addClass("mole").removeClass("activeMole");
			mole = _.random(0, 59);
			$("button").eq(mole).addClass("activeMole").removeClass("mole");
		}
		$("#scoreCount").val(score);
	}
}

function stop() {
	clearTimeout(timeReturn);
	$("#start").val("Continue")
	$("#state").val("Stop.....");
	startOrstop = 1;
}
