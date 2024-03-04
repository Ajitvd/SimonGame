var gamePattern = [];

var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var started = false;

var level = 0;

$(document).keydown(function() {
    
    if(!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
    
});

$(".btn").on("click", function() {
    var userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);

   /* console.log(userClickedPattern); */
    playSound(userChosenColor);

    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Success!");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        var failAudio = new Audio("sounds/wrong.mp3");
        failAudio.play();
        $("body").addClass("game-over");
        
        setTimeout(function() {
            $("body").removeClass("game-over")}, 200);

            startOver();
            
        $("h1").text("Game Over. Press any key to restart!");

        
    }
}

function nextSequence() {
    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomNum = Math.floor(Math.random()*4);
    
    var randomChosenColor = buttonColors[randomNum];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}

function startOver() {
    level = 0;

    started = false;

    gamePattern = [];
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
