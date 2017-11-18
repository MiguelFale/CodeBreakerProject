let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if(answer.value === '' && attempt.value === '') {
    	setHiddenFields();	
    }

    if(validateInput(input.value)) {
    	attempt.value = +attempt.value + +1;
    } else {
    	return;
    }

    if(getResults(input.value) === true) {
    	setMessage("You Win! :)");
    	showAnswer(true);
    	showReplay();
    } else if(attempt.value >= 10) {
    	setMessage("You Lose! :(");
    	showAnswer(false);
    	showReplay();
    } else {
    	setMessage("Incorrect, try again.");
    }
}

//implement new functions here
function setHiddenFields() {
	attempt.value = 0;
	max = 9999;
	min = 0;

	let range = (max - min) + 1;
	temp = Math.floor(Math.random() * range + min).toString();

	while(temp.length < 4) {
		temp = '0' + temp;
	}

	answer.value = temp;
}

function setMessage(argmsg) {
	document.getElementById('message').innerHTML = argmsg;
}

function validateInput(argument) {
	if(argument.length === 4) {
		return true;
	} else {
		setMessage("Guesses must be exactly 4 characters long.");
		return false;
	}
}

function getResults(argu) {
	let initialdiv = '<div class="row"><span class="col-md-6">';
	let enddiv = '</span><div class="col-md-6">';
	let guessedcorrectly = 0;

	let result = initialdiv + argu + enddiv;
	let i = 0
	while(i < 4) {
		if(argu[i] === answer.value[i]) {
			result += '<span class="glyphicon glyphicon-ok"></span>';
			guessedcorrectly += 1;
		} else if(answer.value.includes(argu[i])) {
			result += '<span class="glyphicon glyphicon-transfer"></span>';
		} else {
			result += '<span class="glyphicon glyphicon-remove"></span>';
		}
		i++;
	}
	result += '</div></div>';
	document.getElementById('results').innerHTML = result;
	return guessedcorrectly === 4;
}

function showAnswer(argu) {
	document.getElementById('code').innerHTML = answer.value;
	if(argu ===true) {
		document.getElementById('code').className += " success";	
	} else {
		document.getElementById('code').className += " failure";
	}
}

function showReplay() {
	document.getElementById('guessing-div').style.display = "none";
	document.getElementById('replay-div').style.display = "block";
}