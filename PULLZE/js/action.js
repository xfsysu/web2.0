var start, timeCount, stepCount, imgParts, hipContent;
var isStart, isWin;
var timeReturn;
var time, steps, randomNumber, randomAddDigits, numOfPosition;
var topPosition, leftPosition;
var recordPosition = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
var blankPosition;
var BodyBackground, ImgBackground;
var countBodyChange, countImgChange;

window.onload = function() {
	initialization();
	start.addEventListener('click', startGame);
	BodyBackground.addEventListener('click', changeBodyBackground);
	ImgBackground.addEventListener('click', changeImgBackground);
}

function initialization() {
	isStart = false;
	isWin = false;
	time = steps = 0;
	countBodyChange = 0;
	countImgChange = 0;
	start = document.getElementById("start");
	timeCount = document.getElementById("timeCount");
	stepCount = document.getElementById("stepCount");
	imgParts = document.getElementsByClassName("imgPart");
	hipContent = document.getElementsByTagName('h2');
	BodyBackground = document.getElementById("changeBodyBackground");
	ImgBackground = document.getElementById("changeImgBackground");

	start.value = "start";
	timeCount.value = "0s";
	stepCount.value = "0";
}

function startGame() {//每次点击start都重新开始吧
	time = steps = 0;
	timeCount.value = "0s";
	stepCount.value = "0";
	isStart = true;
	isWin = false;
	randomAddDigits = 1;
	start.value = "restart";
	hipContent[0].textContent = "Playing.......";
	for (var i = 0; i < imgParts.length; i++) {
		imgParts[i].className = "imgPart";
	}

	if(isStart) {
		clearTimeout(timeReturn);//重新开始时将之前的计时终止；
	}
	randomSortImg();//将图片打乱
	for (var i = 0; i < imgParts.length; i++) {
		imgParts[i].onclick = function() {changePosition(this)};
	}
	timeReturn = setInterval(timeCountFunction, 1000);//重新设置定时器

}

function changePosition(currentImg) {
	var currentPosition = 0;
	var currentImgId = parseInt((currentImg.id.substring(4)));//得到点击图片的ID

	for (var i = 1; i <= 16; i++) {
		if (recordPosition[i] == currentImgId) {
			currentPosition = i;
		}
	}
	var canMove = judgeCanMove(currentPosition);

	if (canMove) {//判断能否移动，能移动的话应该往哪边移动
		if (currentPosition + 1 == blankPosition) {//右移
			var imgRightPosition = calculateRightPosition(currentPosition);
			var blankLeftPosition = calculateLeftPosition(blankPosition);

			currentImg.style.left = imgRightPosition;
			document.getElementById("part16").style.left = blankLeftPosition;

			recordPosition[currentPosition] = 16;
			recordPosition[blankPosition] = currentImgId;
			blankPosition = blankPosition - 1;
		}
		else if (currentPosition - 1 == blankPosition) {//左移
			var imgRightPosition = calculateLeftPosition(currentPosition);
			var blankLeftPosition = calculateRightPosition(blankPosition);

			currentImg.style.left = imgRightPosition;
			document.getElementById("part16").style.left = blankLeftPosition;

			recordPosition[currentPosition] = 16;
			recordPosition[blankPosition] = currentImgId;
			blankPosition = blankPosition + 1;
		}
		else if (currentPosition + 4 == blankPosition) {//下移
			var imgRightPosition = calculateDownPosition(currentPosition);
			var blankLeftPosition = calculateTopPosition(blankPosition);

			currentImg.style.top = imgRightPosition;
			document.getElementById("part16").style.top = blankLeftPosition;

			recordPosition[currentPosition] = 16;
			recordPosition[blankPosition] = currentImgId;
			blankPosition = blankPosition - 4;
		}
		else {//上移
			var imgRightPosition = calculateTopPosition(currentPosition);
			var blankLeftPosition = calculateDownPosition(blankPosition);

			currentImg.style.top = imgRightPosition;
			document.getElementById("part16").style.top = blankLeftPosition;

			recordPosition[currentPosition] = 16;
			recordPosition[blankPosition] = currentImgId;
			blankPosition = blankPosition + 4;
		}

		if (!isWin) {/*当赢了的时候步数就不会再增加了*/
			steps++;
			stepCount.value = steps;
		}

		isWin = judgeIsWinGame();

		if (isWin) {
			clearTimeout(timeReturn);//停止时间
			hipContent[0].textContent = "Congratulation You Win!"
			isStart = false;
		}
	}
}

function judgeCanMove(currentPosition) {//判断点击的块是否可移动
	if (currentPosition + 1 == blankPosition || currentPosition - 1 == blankPosition || currentPosition + 4 == blankPosition || currentPosition - 4 == blankPosition) {
		return true;
	}
	else return false;
}

function calculateRightPosition(currentPosition) {
	if (currentPosition == 1 || currentPosition == 5 || currentPosition == 9 || currentPosition == 13) return 89 + "px";
	else if (currentPosition == 2 || currentPosition == 6 || currentPosition == 10 || currentPosition == 14) return 178 + "px";
	else return 267 + "px";
}

function calculateLeftPosition(currentPosition) {
	if (currentPosition == 2 || currentPosition == 6 || currentPosition == 10 || currentPosition == 14) return 0 + "px";
	else if (currentPosition == 3 || currentPosition == 7 || currentPosition == 11 || currentPosition == 15) return 89 + "px";
	else return 178 + "px";
}

function calculateTopPosition(currentPosition) {
	if (currentPosition == 5 || currentPosition == 6 || currentPosition == 7 || currentPosition == 8) return 0 + "px";
	else if (currentPosition == 9 || currentPosition == 10 || currentPosition == 11 || currentPosition == 12) return 89 + "px";
	else return 178 + "px";
}

function calculateDownPosition(currentPosition) {
	if (currentPosition == 1 || currentPosition == 2 || currentPosition == 3 || currentPosition == 4) return 89 + "px";
	else if (currentPosition == 5 || currentPosition == 6 || currentPosition == 7 || currentPosition == 8) return 178 + "px";
	else return 267 + "px";
}

function judgeIsWinGame() {
	for (var i = 1; i <= 16; i++) {
		if (recordPosition[i] != i) {
			return false;
		}
	}
	return true;
}

function randomSortImg() {
	numOfPosition = 1;
	randomNumber = Math.ceil((Math.random() * 1000000)) % 16;
	while (16 % randomAddDigits == 0 || randomAddDigits % 2 == 0) {//要满足这个条件的加数才行，不然随机生成的图像会有些重复
		randomAddDigits = Math.ceil((Math.random() * 1000000)) % 16;
	}
	for (topPosition = 0; topPosition < 268; topPosition += 89) {
		for (leftPosition = 0; leftPosition < 268; leftPosition += 89) {
			randomNumber %= 16;//0~15
			changeImgAbsolutePosition(randomNumber + 1, topPosition, leftPosition);
			recordPosition[numOfPosition] = randomNumber + 1;//方格记录的其实是图像的Id
			if (randomNumber + 1 == 16) {//记录下空白的位置在哪个方格
				blankPosition = numOfPosition;
			}
			numOfPosition++;
			randomNumber += randomAddDigits;
		}
	}

}

function changeImgAbsolutePosition(randomNumber, topPosition, leftPosition) {
	var imgId = "part" + randomNumber;
	var left = leftPosition + "px";
	var top = topPosition + "px";
	document.getElementById(imgId).style.top = top;
	document.getElementById(imgId).style.left = left;

}

function timeCountFunction() {//每过一秒都会调用一次来更新时间
	time++;
	timeCount.value = time + "s";
}

function changeBodyBackground() {
	countBodyChange++;
	countBodyChange %= 6;
	document.getElementsByTagName("body")[0].className = "background" + countBodyChange;
}

function changeImgBackground() {
	countImgChange++;
	countImgChange %= 10;
	for (var i = 0; i < imgParts.length; i++) {
		var tempClassName = "picture" + countImgChange;
		imgParts[i].className = "imgPart" + " " + tempClassName;
	}
}