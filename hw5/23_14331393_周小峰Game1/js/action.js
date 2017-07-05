var isStart, isEnd, isCheat;
var start, end, walls, checkCheat;

window.onload = function() {
	initialization();

	start.addEventListener('mouseover', startGame);
	end.addEventListener('mouseover', endGame);
	checkCheat.addEventListener('mouseover', setCheat);
	for (var i = 0; i < walls.length; i++) {
		walls[i].onmouseover = function() {changeColor(this)};
	}
}

function initialization() {
	//set init enviroment
	isCheat = true;
	isStart = isEnd = false;
	start = document.getElementById("start");
	end = document.getElementById("end");
	walls = document.getElementsByClassName("wall");
	checkCheat = document.getElementById("isCheat");
}

function startGame() {//clear and start
	isCheat = true;
	isStart = true;
	isEnd = false;
	document.getElementById("status").value = "";
	for (var i = 0; i < walls.length; i++) {
		walls[i].className = "wall";
	}
}

function endGame() {//cheat and not cheat
	if (isStart) {//only start can show the result
		isStart = false;
		isEnd = true;

		if (isCheat) {
			document.getElementById("status").value = "Don't Cheat!"
		}
		else {
			document.getElementById("status").value = "You Win!";
		}
	}
}

function setCheat () {
	isCheat = false;
}

function changeColor(currentMouse) {
	if (isStart) {//only start status can change color
		isStart = false;
		currentMouse.className = "wall redWall";
		document.getElementById("status").value = "You Lose!";
	}
}
