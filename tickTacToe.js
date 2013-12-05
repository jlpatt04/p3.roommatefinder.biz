//Initial directions to the users
stylishAlertUser("Player 1 select X or O");

$('#buttonX').click(function() {
  counter++;
  if (counter == 1) {
  $(this).toggleClass('player1Clicked');
  stylishAlertUser("Player 1 is X. Your turn Player 2!");
  player1Symbol = "X";
  player2Symbol = "0";
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
  player1Symbol = "0";
  player2Symbol = "X";
  turnBelongsTo = 'p1';
}else {
  $(this).toggleClass('player2Clicked');
  stylishAlertUser("Player 2 is O.");
  player1Symbol = "X";
  player2Symbol = "0";
  gameStarted = true;
  turnBelongsTo = 'p1';
}
});


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
    fontSize : "2em",
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
  } 
  else if(table[0][0] == table[0][1] && table[0][0] == table[0][2] && table[0][0] != 0){
    winningPlayer = table[0][0];
    stylishAlertUser("Player " + winningPlayer + " won");
  }
  else if(table[0][0] == table[1][0] && table[0][0] == table[2][0] && table[0][0] != 0){
    winningPlayer = table[0][0];
    stylishAlertUser("Player " + winningPlayer + " won");
  }
  else if(table[0][1] == table[1][1] && table[0][1] == table[2][1] && table[0][1] != 0){
    winningPlayer = table[0][1];
    stylishAlertUser("Player " + winningPlayer + " won");
  }
  else if(table[1][0] == table[1][1] && table[1][0] == table[1][2] && table[1][0] != 0){
    winningPlayer = table[1][0];
    stylishAlertUser("Player " + winningPlayer + " won");
  }
  else if(table[2][0] == table[2][1] && table[2][0] == table[2][2] && table[2][0] != 0){
    winningPlayer = table[2][0];
    stylishAlertUser("Player " + winningPlayer + " won");
  }
  else if(table[0][2] == table[1][2] && table[1][2] == table[2][2] && table[0][2] != 0){
    winningPlayer = table[0][2];
    stylishAlertUser("Player " + winningPlayer + " won");
  }
  else if(table[0][2] == table[1][1] && table[1][1] == table[2][0] && table[0][2] != 0){
    winningPlayer = table[0][2];
    stylishAlertUser("Player " + winningPlayer + " won");
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
