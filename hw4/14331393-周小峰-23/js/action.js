var showValue, number, back, clean, equal;
var isExpressionCaled, isUserInputZero;

window.onload = function() {
	initialization();
	for (var i = 0; i < number.length; i++) {
		number[i].onclick = function() {inputNumberOrOperator(this)};
	}
	back[0].addEventListener('click', backOneStep);
	clean[0].addEventListener('click', cleanExpression);
	equal[0].addEventListener('click', calculateExpression);
}

function initialization() {
	isExpressionCaled = false;
	isUserInputZero = false;
	showValue = document.getElementById("showValue");
	number = document.getElementsByClassName("number");
	back = document.getElementsByClassName("back");
	clean = document.getElementsByClassName("clean");
	equal = document.getElementsByClassName("equal");
}

function inputNumberOrOperator(currentButton) {
	if (isExpressionCaled) {
		showValue.value = "0";
		isExpressionCaled = false;//flag should change when use it 
	}

	if (showValue.value == "0" && !isUserInputZero) {
		showValue.value = currentButton.value;//only this situation zero can cancel
	}
	else {
		showValue.value += currentButton.value;
	}

	if (currentButton.value == "0") {//set the flag true when user input zero
		isUserInputZero = true;
	}
}

function backOneStep() {
	var expression = showValue.value;

	if (expression.length >= 1) {
		showValue.value = expression.substring(0, expression.length - 1);
	}
}

function cleanExpression() {
	showValue.value = "";

}

function calculateExpression() {
	try {
		var result = eval(showValue.value);

		if (result == "Infinity") {
			alert("The number 0 can't be divisor, please check it")
		}//Infinity can't throw an exception
		else {
			showValue.value = result;
			isExpressionCaled = true;//expression is caled successly
			isUserInputZero = false;
		}
	} catch(exception) {
		// statements
		alert("The expression is not valid, please check it");
	}
}