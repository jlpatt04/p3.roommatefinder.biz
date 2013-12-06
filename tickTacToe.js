//Initial directions to the users
setTimeout(function() {
      stylishAlertUser("Player 1 click X or O to begin.");
    }, 2000);

//reload the page once the user clicks the restart button
$('.restartButton').click(function() {
    location.reload();
});

/* Adds a class depending if Player 1 or 2(for CSS styling), initializes X or O for playerSymbol,
keeps track of whose turn it is, if the game has started, and removes the click event handler once
both players have selected X or O. */
$('#buttonX').click(function() {
    counter++;
    if (counter == 1) {
      $(this).toggleClass('player1Clicked');
      stylishAlertUser("Player 1 is X. Player 2 click O.");
      player1Symbol = "X";
      player2Symbol = "0";
      turnBelongsTo = 'p1';
      $('#buttonX').unbind("click");
    }
    else{
      $(this).toggleClass('player2Clicked');
      stylishAlertUser("Player 1 click a button to make the first move.");
      player1Symbol = "0";
      player2Symbol = "X";
      turnBelongsTo = 'p1';
      gameStarted = true;
      $('#buttonX').unbind("click");
    }
});

$('#buttonO').click(function() {
    counter++;
    if (counter == 1) {
      $(this).toggleClass('player1Clicked');
      stylishAlertUser("Player 1 is O. Player 2 click X.");
      player1Symbol = "0";
      player2Symbol = "X";
      turnBelongsTo = 'p1';
      $('#buttonO').unbind("click");
    }
    else{
      $(this).toggleClass('player2Clicked');
      stylishAlertUser("Player 1 click a button to make the first move.");
      player1Symbol = "X";
      player2Symbol = "0";
      gameStarted = true;
      turnBelongsTo = 'p1';
      $('#buttonO').unbind("click");
    }
});


$('.gameButtons').click(function() {
  
    //Makes sure Player 1 and 2 select X and O before the game begins
    if(!gameStarted){
      alert("Both players need to click X or 0 to begin. ");
      return;
    }
  
    //Adds the ButtonClicked class once button is clicked for CSS Styling
    if((numberOfClicks == 0) || (numberOfClicks ==2) || (numberOfClicks == 4) || (numberOfClicks == 6 ) || (numberOfClicks == 8)){
      $(this).toggleClass('player1Clicked');
    }
    else{
      $(this).toggleClass('player2Clicked');
    }

    var buttonName = $(this).attr('id');

    var result = ijValueForButtonName(buttonName);

    var i = result[0];

    var j = result[1];

    var spaceAvailable = isSpaceAvailable(result[0],result[1]); //in the button clicked

    //Alerts the user if they have already selected a game button
    if(!spaceAvailable){
      stylishAlertUser("Already Taken!");
      return;
    }

    numberOfClicks++;

    //Monitors whose turn it is and add X or O depending on the player
    if (turnBelongsTo == 'p1') {
      $(this).html(player1Symbol);  
      turnBelongsTo = 'p2';
      table[i][j] = 1;
        if(numberOfClicks < 9){
          stylishAlertUser("Player 2's Turn");
      }
    }else{
      $(this).html(player2Symbol);  
      turnBelongsTo = 'p1';
      table[i][j] = 2; 
        if(numberOfClicks < 9){
          stylishAlertUser("Player 1's Turn");
      }
    }

    //resets noPlayer to default
    winningPlayer = "noPlayer";

    //check if the user is a winner
    isWinner();
    
    //calls the isADraw function when there is no winner and the board is full
    if(numberOfClicks == 9 &&  winningPlayer == "noPlayer") {
      isADraw();
      isGameOver();
    }

    //Triggers the isGameOver function when a player wins
    if(winningPlayer == 1 || winningPlayer == 2){
        isGameOver();
    }

});

/*-------------------------------------------------------------------------------------------------
Functions
-------------------------------------------------------------------------------------------------*/

function stylishAlertUser(text){
  
  $('#alertText').html(text);

  $('#alertText').animate({
      fontSize : "2em",
    },3000,function(){
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
  setTimeout(function() {
      stylishAlertUser("Click restart to play again!");
      }, 3000);
    $('.gameButtons').unbind("click");
} 


function isADraw() {
    stylishAlertUser("It's a Draw! ");
    $('.gameButtons').unbind("click");
}