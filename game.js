
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPatter = [];

var level=0;

var start = false;

$(document).keypress(function()
{
      if(!start)
      {
            $("#level-title").text("Level "+level);
            nextSequence();
            start=true;
      }
});



$(".btn").click(function () {
      var add = $(this).attr("id");
      userPatter.push(add);
      console.log(userPatter);

      playSound(add);
      AnimateBox(add);

      checkAnswer(userPatter.length-1);
});

function checkAnswer(currentlevel)
{
      if(gamePattern[currentlevel]==userPatter[currentlevel])
      {
            console.log("right");

            if(gamePattern.length==userPatter.length)
            {
                  setTimeout(function()
                  {nextSequence();
                  },1000);
            }
      }

      else
      {
            console.log("wrong");
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function()
            {
                  $("body").removeClass("game-over");
            },200);

            $("#level-title").text("Game Over! Press any key to continue");

            startOver();
      }
}


function nextSequence() {
      // userPatter = [];
      level++;
      $("#level-title").text("Level " + level);
      var randomNumber = Math.floor(Math.random() * 3);
      var randomChosenColor = buttonColours[randomNumber];
      gamePattern.push(randomChosenColor);
      console.log("Random color ="+randomChosenColor);
      $("#" + randomChosenColor).fadeIn(80).fadeOut(80).fadeIn(80);

      playSound(randomChosenColor);
     
}



function playSound(name)
{
      //to play the sound;
      var audio = new Audio("sounds/" + name + ".mp3");
      audio.play();
}

function AnimateBox(color)
{
      $("#"+color).addClass("pressed");
      setTimeout(
            function() {$("#"+color).removeClass("pressed");},100);
}

function startOver()
{
      level=0;
      start=false;
      userPatter=[];
}