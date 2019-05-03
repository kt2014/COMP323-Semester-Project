var intervalId;
var time;
var correctAnswerCount = 0;
var incorrectAnswerCount = 0;
var unansweredCount = 0;
var questionCounter = 0;
var correctAnswer;
var correctImage;


$(document).ready(function(){
    $('#quizModal').modal('hide');

    $('.map').on('click', 'path', usQuiz);

    $(function () {
        $(".mapcontainer").mapael({
            map: {
                name: "usa_states"
                , defaultArea: {
                    attrs: {
                        fill: "#c2b280"
                        , stroke: "#ced8d0"
                    }
                    , attrsHover: {
                        fill: "#d96459"
                    }
                }
            },
        });
    });

});

function usQuiz(){
    console.log("$(this).attr('data-id'): " + $(this).attr("data-id"));

    time = 15;
	correctAnswerCount = 0;
	incorrectAnswerCount = 0;
	unansweredCount = 0;
	questionCounter = 0;

    var state = $(this).attr("data-id");
    $('#quizModal').modal('show');
    $('#quizHeader').html("You are attacking " + state + " !");
	$("#timer").html("Time Remaining: " + time);
    $('#quizQuestion').html("");
    $("#choices").html("");
	clearInterval(intervalId);
	intervalId = setInterval(decrement, 1000);
	quizQuestions(questionCounter);
}

function quizQuestions(number) {
	var question = quiz[number].question;
	$("#question").html("Question #" + parseInt(number+1) + ": " + question);
	var options = quiz[number].choices;
	for (var opt in options) {
		$("#choices").append("<button class='btnChoices'>" + options[opt] + "</button>" + "<br>");
	}
	correctAnswer = quiz[number].answer;
	correctImage = quiz[number].image;
	checkAnswer(correctAnswer);
}

function checkAnswer(answer) {
	$(".btnChoices").on("click", function() {
		var userText = $(this).text();
		if (answer === userText) {
			correctAnswerCount++;
			$("#question").hide();
			$("#choices").html("Wow, you got it!");
			stop();   
			questionCounter++;
			setTimeout(resetQuestion, 1000 * 1);        
		} 
		else {
			incorrectAnswerCount++;
			$("#choices").html("Sorry, that's a wrong answer!");
			wrongAnswer();
		}
		
	});
}

function decrement() {
	time--;
	$("#timer").html("Time Remaining: " + time);
	if (time === 0) {
		unansweredCount++;
		$("#choices").html("Out of time!");
		wrongAnswer();
		questionCounter++;
		setTimeout(resetQuestion, 1000 * 1);
	}
}

function stop() {
	clearInterval(intervalId);
}

function resetQuestion() {
	if (questionCounter == quiz.length) {
		$("#question").show();
		$("#question").html("Here is your score:");
		$("#choices").html("<p id='results'> Correct Answers: " + correctAnswerCount + "<br>" + "Incorrect Answers: " + incorrectAnswerCount + "<br>" + "Unanswered: " + unansweredCount + "</p>");
		$("#start").show();
		$("#start").html("Start Over?");
	} else {
		time = 15;
		$("#timer").html("Time Remaining: " + time);
		$("#question").show();
		$("#choices").html("");
		clearInterval(intervalId);
		intervalId = setInterval(decrement, 1000);
		quizQuestions(questionCounter);
	}
}

function wrongAnswer() {
	$("#question").hide();
	$("#choices").append("The correct answer was: " + correctAnswer);
	$("#start").show();
	stop();

}