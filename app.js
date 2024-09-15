// For reference, I used https://dev.to/sulaimonolaniran/building-a-simple-quiz-with-html-css-and-javascript-4elp a lot to help with the layout and function of the quiz


// Pre-setting qns
const questions = [
	{
		question: "Which of these is not a type of logic gate?",
		answerA: "NOT",
		answerB: "AND",
		answerC: "WHY",
		answerD: "OR",
		correctAnswer: "answerC"
	},
	{
		question: "Which of the following is not a type of secondary storage?",
		answerA: "Cache memory",
		answerB: "Hard disk drive (HDD)",
		answerC: "DVD R/RW",
		answerD: "USB thumb drive",
		correctAnswer: "answerA"
	},
	{
		question: "Which of the following protocols is used to transfer files over a network?",
		answerA: "SMTP",
		answerB: "IMAP",
		answerC: "POP",
		answerD: "FTP",
		correctAnswer: "answerD"
	},
	{
		question: "Which of these is a real thing?",
		answerA: "Motherboard",
		answerB: "Fatherboard",
		answerC: "Sisterboard",
		answerD: "Brotherboard",
		correctAnswer: "answerA"
	},
	{
		question: "What is USB short for?",
		answerA: "Unique Serial Bantam",
		answerB: "Universal Serial Bus",
		answerC: "Ultra Silly Badger",
		answerD: "Under Several Books",
		correctAnswer: "answerB"
	},
]

// Variables
let questionNumber = 1 //holds the current question number
let playerScore = 0  //holds the player score
let wrongAttempt = 0 //amount of wrong answers picked by player
let indexNumber = 0 //will be used in displaying next question

// Changing info when qn changes
function NextQuestion(index) {
	// Change current qn
	const currentQuestion = questions[index];
	// change qn number
	document.getElementById("question-number").innerHTML = questionNumber;
	// Change player score
	document.getElementById("player-score").innerHTML = playerScore;
	// change qn
	document.getElementById("display-question").innerHTML = currentQuestion.question;
	// Change labels
	document.getElementById("answer-one-label").innerHTML = currentQuestion.answerA;
	document.getElementById("answer-two-label").innerHTML = currentQuestion.answerB;
	document.getElementById("answer-three-label").innerHTML = currentQuestion.answerC;
	document.getElementById("answer-four-label").innerHTML = currentQuestion.answerD;

}


// Checking the answer
function checkForAnswer() {
	const currentQuestion = questions[indexNumber]; //gets current Question 
	const currentQuestionAnswer = currentQuestion.correctAnswer; //gets current Question's answer
	const answers = document.getElementsByName("answer"); //gets all answers from qn in html
	let correctAnswer = null; //Temporarily make an option for correct option


	// Looking for correct answer's radio input id
	// Loop over every answer option
	answers.forEach((answer) => {
		// If the answer option is the correct answer
		if (answer.value === currentQuestionAnswer) {
			//get's correct answer's radio input id
			correctAnswer = answer.labels[0].id;
		}
	})

	//Make sure it's displayed as a flex
	// If all the answers arent chosen
	if (answers[0].checked === false && answers[1].checked === false && answers[2].checked === false && answers[3].checked == false) {
		// Display the qn as a flex container
		document.getElementById('answer-modal').style.display = "flex";
	}


	//checking if checked radio button is same as answer
	// Loop over every answer
	answers.forEach((answer) => {
		// If the answer has been checked and it's the correct answer
		if (answer.checked === true && answer.value === currentQuestionAnswer) {
			// Change the colour to green
			document.getElementById(correctAnswer).style.backgroundColor = "green";
			playerScore++; //adding to player's score
			indexNumber++; //adding 1 to index so can display next question
			//set to delay question number till when next question loads
			setTimeout(() => {
				questionNumber++;
			}, 1000)
		}

		// Else if the answer is wrong
		else if (answer.checked && answer.value !== currentQuestionAnswer) {
			// Get the wrong label ID
			const wrongLabelId = answer.labels[0].id;
			// Change the wrong label's colour to red
			document.getElementById(wrongLabelId).style.backgroundColor = "red";
			// Change the right answer's label to green
			document.getElementById(correctAnswer).style.backgroundColor = "green";
			wrongAttempt++; //adds 1 to wrong attempts 
			indexNumber++; //adding 1 to index so can display next question
			//set to delay question number till when next question loads
			setTimeout(() => {
				questionNumber++;
			}, 1000)
		}


	})


}



//When the next button is called
function handleNextQuestion() {
	checkForAnswer(); //check if player picked right or wrong answer
	unCheckRadioButtons(); //Uncheck radio buttons
	//delays next question so we can do the following
	setTimeout(() => {
		//displays next question as long as there's another question
		if (indexNumber <= 4) {
			// Reset background colours
			resetAnswerBackground();
			// Go to next qn
			NextQuestion(indexNumber);

		}
		// Else end the game
		else {
			handleEndGame();
		}

	}, 1000);
}

//Resettin g background colours
function resetAnswerBackground() {
	// Temp all the answers
	const answers = document.getElementsByName("answer");
	// Loop over answers
	answers.forEach((answer) => {
		// Change background colour to blank
		document.getElementById(answer.labels[0].id).style.backgroundColor = "";
	})
}

// Resetting radio buttons
function unCheckRadioButtons() {
	const answers = document.getElementsByName("answer");
	for (let i = 0; i < answers.length; i++) {
		answers[i].checked = false;
	}
}

// Stopping the game
function handleEndGame() {
	// Create remarks based on grade
	let remark = null;
	let remarkColor = null;

	// condition check for player remark and remark color
	// If bad score, bad remark
	if (playerScore <= 1) {
		remark = "Bad Grades, Keep Practicing.";
		remarkColor = "red";
	}
	// If average score, average remark
	else if (playerScore >= 2 && playerScore < 4) {
		remark = "Average Grades, You can do better.";
		remarkColor = "orange";
	}
	// If good score, good remark
	else if (playerScore >= 4) {
		remark = "Excellent, Keep the good work going.";
		remarkColor = "green";
	}
	const playerGrade = (playerScore / 5) * 100;

	//data to display to score board
	document.getElementById('remarks').innerHTML = remark;
	document.getElementById('remarks').style.color = remarkColor;
	document.getElementById('grade-percentage').innerHTML = playerGrade;
	document.getElementById('wrong-answers').innerHTML = wrongAttempt;
	document.getElementById('right-answers').innerHTML = playerScore;
	document.getElementById('score-modal').style.display = "flex";

}

//closes score modal, resets game and reshuffles questions
function closeScoreModal() {
	//Reset variables
	questionNumber = 1;
	playerScore = 0;
	wrongAttempt = 0;
	indexNumber = 0;
	NextQuestion(indexNumber); //set next qn
	unCheckRadioButtons(); //Uncheck radio buttons
	resetAnswerBackground(); //reset background stuff
	document.getElementById('score-modal').style.display = "none"; //Hide the score pop up
}

//function to close warning modal
function closeAnswerModal() {
	document.getElementById('answer-modal').style.display = "none"; //hide the warning pop up
}

