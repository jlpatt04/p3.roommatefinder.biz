
stylishAlertUser("Player 1 select X or O");
//stylishAlertUser("Player 2 select X or O");


$('#buttonX').click(function() {
  counter++;
  if (counter == 1) {
  $(this).toggleClass('player1Clicked');
  stylishAlertUser("Player 1 is X. Your turn Player 2!");
  //stylishAlertUser("Player 2 please select O.");
  player1Symbol = "X";
  player2Symbol = "0";
  //gameStarted = true;
  turnBelongsTo = 'p1';
}else {
  $(this).toggleClass('player2Clicked');
  stylishAlertUser("Player 2 is X.");
  player1Symbol = "0";
  player2Symbol = "X";
  turnBelongsTo = 'p1';
  gameStarted = true;
}
});

$('#buttonO').click(function() {
  counter++;
  if (counter == 1) {
  $(this).toggleClass('player1Clicked');
  stylishAlertUser("Player 1 is O. Your turn Player 2!");
  //stylishAlertUser("Player 2 please select X.");
  player1Symbol = "0";
  player2Symbol = "X";
  turnBelongsTo = 'p1';
  //gameStarted = true;
}else {
  $(this).toggleClass('player2Clicked');
  stylishAlertUser("Player 2 is O.");
  player1Symbol = "X";
  player2Symbol = "0";
  gameStarted = true;
  turnBelongsTo = 'p1';
}
});


if(player1Symbol == 1 || 2 && player2Symbol == 1 || 2) {
  gameStarted = true;
} else {
  alert("Please select X or 0. ");
}

$('.gameButtons').click(function() {
  if(!gameStarted){
    alert("Please select X or 0. ");
    return;
  }
  
  //adds the ButtonClicked class once button is clicked for CSS Styling
  if((numberOfClicks == 0) || (numberOfClicks ==2) || (numberOfClicks == 4) || (numberOfClicks == 6 ) || (numberOfClicks == 8)){
    $(this).toggleClass('player1Clicked');
  } else {
    $(this).toggleClass('player2Clicked');
  }

  var buttonName = $(this).attr('id');

  var result = ijValueForButtonName(buttonName);

  var i = result[0];

  var j = result[1];

  var spaceAvailable = isSpaceAvailable(result[0],result[1]); //in the button clicked

  if(!spaceAvailable){
    stylishAlertUser("Already Taken!");
    return;
  }

  numberOfClicks++;

  if (turnBelongsTo == 'p1') {
    $(this).html(player1Symbol);  
    turnBelongsTo = 'p2';
    table[i][j] = 1;
    stylishAlertUser("Turn belongs to you p2");
  }else{
    $(this).html(player2Symbol);  
    turnBelongsTo = 'p1';
    table[i][j] = 2; 
    stylishAlertUser("Turn belongs to you p1");
  }

  var winner = isWinner();
    
  
  if(numberOfClicks == 9 && winningPlayer == undefined) {
    isADraw();
  } 

 if(winningPlayer == 1 || winningPlayer == 2){
    setTimeout(isGameOver, 3000);
    confetti();
  } 

});


$('.restartButton').click(function() {
  location.reload();
});


/*-------------------------------------------------------------------------------------------------
Functions
-------------------------------------------------------------------------------------------------*/

function stylishAlertUser(text){
  
  $('#alertText').html(text);

  $('#alertText').animate({
    fontSize : "3em",
  },2000,function(){
    $('#alertText').html("");

    var styles = {
      fontSize: "1em",
      width : 125
    };

  $('#alertText').css(styles);

  });

}


function ijValueForButtonName(name){

  var value = parseInt(name);
  i = Math.floor(value/3);
  j= value%3;
  return new Array(i,j);
}

function isSpaceAvailable () {
  if(table[i][j] == 0){
    return true;  
  }
  return false;
}

function isWinner() {

  if(table[0][0] == table[1][1] && table[0][0] == table[2][2] && table[0][0] != 0){
    winningPlayer = table[0][0];
    stylishAlertUser("Player " + winningPlayer + " won");
    //isGameOver();
  } 
  else if(table[0][0] == table[0][1] && table[0][0] == table[0][2] && table[0][0] != 0){
    winningPlayer = table[0][0];
    stylishAlertUser("Player " + winningPlayer + " won");
    //isGameOver();
  }
  else if(table[0][0] == table[1][0] && table[0][0] == table[2][0] && table[0][0] != 0){
    winningPlayer = table[0][0];
    stylishAlertUser("Player " + winningPlayer + " won");
    //isGameOver();
  }
  else if(table[0][1] == table[1][1] && table[0][1] == table[2][1] && table[0][1] != 0){
    winningPlayer = table[0][1];
    stylishAlertUser("Player " + winningPlayer + " won");
    //isGameOver();
  }
  else if(table[1][0] == table[1][1] && table[1][0] == table[1][2] && table[1][0] != 0){
    winningPlayer = table[1][0];
    stylishAlertUser("Player " + winningPlayer + " won");
    //isGameOver();
  }
  else if(table[2][0] == table[2][1] && table[2][0] == table[2][2] && table[2][0] != 0){
    winningPlayer = table[2][0];
    stylishAlertUser("Player " + winningPlayer + " won");
    //isGameOver();
  }
  else if(table[0][2] == table[1][2] && table[1][2] == table[2][2] && table[0][2] != 0){
    winningPlayer = table[0][2];
    stylishAlertUser("Player " + winningPlayer + " won");
    //isGameOver();
  }
  else if(table[0][2] == table[1][1] && table[1][1] == table[2][0] && table[0][2] != 0){
    winningPlayer = table[0][2];
    stylishAlertUser("Player " + winningPlayer + " won");
    //isGameOver();
  }
}


function isGameOver(){
 /* var max = 2;
  var min = 0;
  var table = new Array();
  for(i = 0; i <= max; i++){
    table[i] = new Array();
      for (j = 0; j <= max; j++) {
        table[i][j] = 0;
      }
  }
  counter = 0;
  gameStarted = false;
  numberOfClicks = 0;
  turnBelongsTo = "p1";
  $('.gameButtons').html('');
  $('.gameButtons').html('');
  $('.gameButtons').css({backgroundColor:'#1b4376'});
  $('.starterButtons').css({backgroundColor:'#1b4376'}); */


  stylishAlertUser("Click Restart Game to play again!");

} 

function isADraw() {
  stylishAlertUser("It's a Draw! Play again :) ");
  isGameOver();
}


/*function confetti() {
NUM_CONFETTI = 350
COLORS = [[85,71,106], [174,61,99], [219,56,83], [244,92,68], [248,182,70]]
PI_2 = 2*Math.PI


canvas = document.getElementById "world"
context = canvas.getContext "2d"
window.w = 0
window.h = 0

resizeWindow = ->
  window.w = canvas.width = window.innerWidth
  window.h = canvas.height = window.innerHeight

window.addEventListener 'resize', resizeWindow, false
  
window.onload = -> setTimeout resizeWindow, 0

range = (a,b) -> (b-a)*Math.random() + a

drawCircle = (x,y,r,style) ->
  context.beginPath()
  context.arc(x,y,r,0,PI_2,false)
  context.fillStyle = style
  context.fill()

xpos = 0.5

document.onmousemove = (e) ->
  xpos = e.pageX/w

window.requestAnimationFrame = do ->
  window.requestAnimationFrame       ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame    ||
  window.oRequestAnimationFrame      ||
  window.msRequestAnimationFrame     ||
  (callback) -> window.setTimeout(callback, 1000 / 60)


class Confetti

  constructor: ->
    @style = COLORS[~~range(0,5)]
    @rgb = "rgba(#{@style[0]},#{@style[1]},#{@style[2]}"
    @r = ~~range(2,6)
    @r2 = 2*@r
    @replace()

  replace: ->
    @opacity = 0
    @dop = 0.03*range(1,4)
    @x = range(-@r2,w-@r2)
    @y = range(-20,h-@r2)
    @xmax = w-@r
    @ymax = h-@r
    @vx = range(0,2)+8*xpos-5
    @vy = 0.7*@r+range(-1,1)

  draw: ->
    @x += @vx
    @y += @vy
    @opacity += @dop
    if @opacity > 1
      @opacity = 1
      @dop *= -1
    @replace() if @opacity < 0 or @y > @ymax
    if !(0 < @x < @xmax)
      @x = (@x + @xmax) % @xmax
    drawCircle(~~@x,~~@y,@r,"#{@rgb},#{@opacity})")


confetti = (new Confetti for i in [1..NUM_CONFETTI])

window.step = ->
  requestAnimationFrame(step)
  context.clearRect(0,0,w,h)
  c.draw() for c in confetti

step()
}*/