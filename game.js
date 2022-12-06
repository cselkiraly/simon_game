var buttonColours = ["red", "blue", "green", "yellow"];
userClickedPattern = [];
gamePattern = [];
var game_started = false;
var level = 0;

function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    return randomNumber;
}

function nextRound() {
    $("#info").text("Get the pattern.");
    randomChosenColour = buttonColours[nextSequence()];
    gamePattern.push(randomChosenColour);
    userClickedPattern = [];
    setTimeout(replayButtons, 1000);
}

function startOver() {
    userClickedPattern = [];
    gamePattern = [];
    level = 0;
    game_started = false;
    $("#level-title").text("Press A Key to Start");
    $("#info").text("");
    $("#info").toggleClass("game-over");
}

function playSound(name) {
    var Sound = new Audio(src="sounds/"+name+".mp3");
    Sound.play();
}

function replayButtons() {
    for (let round = 0; round < gamePattern.length; round++) {
        setTimeout(function() {
            animatePress(gamePattern[round]);
            playSound(gamePattern[round]);
        }, round*1000)
    }
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    //$("#"+currentColour).fadeOut(100).fadeIn(100);
    setTimeout(function() {$("#"+currentColour).removeClass("pressed")}, 200)
}

function checkAnswer(currentLevel, element) {
    if ( userClickedPattern[currentLevel] !== gamePattern[currentLevel] ) {
        console.log("Wrong")
        playSound("wrong")
        $("#info").toggleClass("game-over");
        $("#info").text("You lost! Starting over...");
        setTimeout(startOver,3000);
    }
    else {
        console.log("Success")
        playSound(element.attr("id"))
        if (userClickedPattern.length === gamePattern.length) {
            nextRound();
        }
    }
}

$(".btn").click(function(){
    var currentChosenColour = $(this).attr("id");
    userClickedPattern.push(currentChosenColour);
    playSound(currentChosenColour);
    checkAnswer(userClickedPattern.length-1, $(this));
})

$(document).keypress(function() {
    if (!game_started) {
        //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("#info").text("New Game");
        $("#level-title").text("Level " + level);
        game_started = true;
        setTimeout(nextRound,1500);
        }
    }
)