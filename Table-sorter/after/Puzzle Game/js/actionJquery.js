var map = [];
var blankPosition = [3, 3];//record the blankPosition
var move = [[0, -1], [1, 0], [0, 1], [-1, 0]];
var puzzles = [];
var timeReturn, isStart = false;
var time = 0, step = 0;

window.onload = function() {
	createPuzzle();
	$("#start").click(startGame);
	$(".imgPart").click(imgMove);
}

function createPuzzle() {
	var count = 1;
	for (var i = 1; i <= 4; i++) {
		for (var j = 1; j <= 4; j++) {
			var puzzle = document.createElement('div');

			puzzle.className = "imgPart row" + i + " col" + j;
			puzzle.id = "r" + i + "c" + j;
			//puzzle.textContent = count++;
			$("#gameSection").append(puzzle);
			puzzles.push(puzzle);
		}
	}
}

function startGame() {
	initilization();
	randomSortImg();
	timeReturn = setInterval(countTime, 1000);
}

function initilization() {
	isStart = true;
	map = [];
	map = _.chunk([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,14, 15], 4);//分为四组
	blankPosition = [3, 3];
	time = 0;
	step = 0;
	$("#timeCount").val("0s");
	$("#stepCount").val(step);
	clearTimeout(timeReturn);
	document.getElementsByTagName("h2")[0].textContent = "Playing...";
}

/*随机打乱图片实际是将空白块先移动若干步骤，所以拼图肯定有是有解的*/
function randomSortImg() {
	/*从0，1,2,3中随机选出一个数，代表着空白块将要移动的方向*/
	for (var i = 0; i < 1000; i++) {
		var next = _.random(0, 3);
		var x = move[next][0] + blankPosition[0];
		var y = move[next][1] + blankPosition[1];

		if (x < 0 || x > 3 || y < 0 || y > 3) {
			i--;
			continue;//judge position
		}
		changPosition(blankPosition, {0:x, 1:y});
		blankPosition[0] = x;
		blankPosition[1] = y;
	}
}

function countTime() {
	time++;
	$("#timeCount").val(time + "s");
}

function changPosition(blankPosition, selectedImg) {
	var blankImg = map[blankPosition[0]][blankPosition[1]];
	var currentImg = map[selectedImg[0]][selectedImg[1]];

	map[blankPosition[0]][blankPosition[1]] = currentImg;
	map[selectedImg[0]][selectedImg[1]] = blankImg;
	

	puzzles[blankImg].className = "imgPart row" + (selectedImg[0] + 1) + " col" + (selectedImg[1] + 1);
	puzzles[currentImg].className = "imgPart row" + (blankPosition[0] + 1) + " col" + (blankPosition[1] + 1);
}

function imgMove(event) {
	var imgId = event.target.className;
	var currentImg = {0: imgId[11] - 1, 1: imgId[16] - 1};

	if (canMove(blankPosition, currentImg)) {
		if (isStart) {
			step++;
			$("#stepCount").val(step);
			changPosition(blankPosition, currentImg);
			blankPosition[0] = currentImg[0];
			blankPosition[1] = currentImg[1];
			if (isCompleted()) {
				showResult();
			}
		}
	}
}

function canMove(blankPosition, currentImg) {
	if (Math.abs(blankPosition[0] - currentImg[0]) == 1&&blankPosition[1] == currentImg[1]) return true;
  	if (blankPosition[0] == currentImg[0]&&Math.abs(blankPosition[1] - currentImg[1]) == 1) return true;
  	return false;
}

function isCompleted() {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (map[i][j] != i * 4 + j) return false;
		}
	}
	return true;
}

function showResult() {
	document.getElementsByTagName("h2")[0].textContent = "Congratulate you win!";
}


