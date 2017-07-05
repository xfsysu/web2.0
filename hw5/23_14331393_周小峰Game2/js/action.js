var start, timeCount, state, scoreCount, ground, holeGroups;
var isStart;
var randomNumber, time, score;
var timeReturn;

window.onload = function() {
	initialization();

	start.addEventListener('click', startOrStop);
	for (var i = 0; i < holeGroups.length; i++) {
		holeGroups[i].onclick = function() {hit(this)};
	}
}

function initialization() {//set init environment
	isStart = false;
	time = 30;
	score = 0;
	start = document.getElementById("start");
	state = document.getElementById("state");
	timeCount = document.getElementById("timeCount");
	scoreCount = document.getElementById("scoreCount");
	ground = document.getElementById("ground");

	for (var i = 0; i < 60; i++) {
		var hole = document.createElement("button");

		hole.className = "mole";
		ground.appendChild(hole);

		if ((i + 1) % 10 == 0 && i != 59) {
			var nextLine = document.createElement("br");

			ground.appendChild(nextLine);
		}
	}
	holeGroups = document.getElementsByClassName("mole");
}

function startOrStop() {
	if (start.value == "Start Game") {
		isStart = true;
		start.value = "Pause";
		state.value = "playing..";

		timeReturn = setInterval(countTimeFunction, 1000);//set time count when start
		randomNumber = Math.floor(Math.random() * (holeGroups.length - 1));
		holeGroups[randomNumber].className = "mole activeMole";
	}
	else if (start.value == "Pause") {
		isStart = false;
		start.value = "Continue";
		state.value = "Pause.."
		clearTimeout(timeReturn);//time stop when pause
	}
	else {
		isStart = true;
		start.value = "Pause";
		state.value = "playing..";
		timeReturn = setInterval(countTimeFunction, 1000);
	}
}

function hit(currentButton) {
	if (isStart) {//only start it can work
		if (currentButton.className == "mole") {
			score--;
		}
		else {
			score++;
			currentButton.className = "mole";
			//start another random hole
			randomNumber = Math.floor(Math.random() * (holeGroups.length - 1));
			holeGroups[randomNumber].className = "mole activeMole";
		}
		scoreCount.value = score;
	}
}

function countTimeFunction() {
	time--;
	timeCount.value = time;
	if (time < 0) {//over game
		timeCount.value = "0";
		start.value = "Start Game";
		state.value = "Game Over";
		clearTimeout(timeReturn);//stop the setInterval
		alert("Game Over\nYour scores:" + score);
		restartGame();
	}
}

function restartGame() {
	time = 30;
	score = 0;
	isStart = false;
	start.value = "Start Game";
	state.value = "Game Over";
	timeCount.value = "30";
	scoreCount.value = "0";
	for (var i = 0; i < holeGroups.length; i++) {
		holeGroups[i].className = "mole";
	}
}
