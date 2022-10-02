var playerOne = prompt("Player one: Enter your name, your color will be Blue.");
var playerOneColor = "rgb(86, 151,  255)";

var playerTwo = prompt("Player two: Enter your name, your color will be Red.");
var playerTwoColor = "rgb(237, 45, 73)";

var gameOn = true;
var table = $('table tr');

// Report win
function reportWin(rowIndex, columnIndex){
    console.log("You won starting at this row and column");
    console.log(rowIndex, columnIndex);
}

// Change Color of td
function changeColor(rowIndex, colIndex, color){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}

// Return Color of a( specific table index
function returnColor(rowIndex, colIndex){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

// Check button
function checkButton(colIndex){
    var colorReport = returnColor(5, colIndex);
    for (var row = 5; row > -1; row--){
        colorReport =  returnColor(row, colIndex);
        if (colorReport === 'rgb(128, 128, 128)'){
            return row;
        }
    }
}

// Color Match Check
function colorMatchCheck(one, two, three, four){
    return (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined);
} 

// Horizontal Win Check
function horizontalWinCheck(){
    for (var row = 0; row < 6; row++){
        for (var col = 0; col < 4; col++){
            if (colorMatchCheck(returnColor(row, col), returnColor(row, col+1), returnColor(row, col+2), returnColor(row, col+3))){
                reportWin(row, col);
                console.log("Horizontal win");
                return true;
            }else{
                continue;
            }
        }
    }
}

// Vertical Win Check
function verticalWinCheck(){
    for (var col = 0; col < 7; col++){
        for (row = 0; row < 3; row++){
            if (colorMatchCheck(returnColor(row, col), returnColor(row+1, col), returnColor(row+2, col), returnColor(row+3, col))){
                reportWin(row, col);
                console.log("Vertical Win");
                return true;
            }else{
                continue;
            }
        }
    }
}

// Diagonal Win Check
function diagonalWinCheck(){
    for (var col = 0; col < 5; col++) {
        for (var row = 0; row < 7; row++) {
          if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2), returnColor(row+3,col+3))) {
            console.log('diag');
            reportWin(row,col);
            return true;
          }else if (colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2), returnColor(row-3,col+3))) {
            console.log('diag');
            reportWin(row,col);
            return true;
          }else {
            continue;
          }
        }
      }
}


// End Game
function gameEnd(winningPlayer) {
    $('h3').fadeOut('fast');
    $('h2').fadeOut('fast');
    $('h1').text(winningPlayer+" has won! Refresh your browser to play again!").css("fontSize", "50px")
  }

// Start with player one
var currentPlayer = 1;
var currentName = playerOne;
var currentColor = playerOneColor;

// Start game with player one
$('h3').text(playerOne + ": it's your turn");
$('.board button').on('click', function(){
    // Identify the col
    var col = $(this).closest('td').index();

    
    // Check for the button to change
    var buttomAvail = checkButton(col);
    
    // Drop this chip in that col
    changeColor(buttomAvail, col, currentColor);

    // Check for win or tie
    if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
        gameEnd(currentName);
        
    }

    // If no win or tie continue to next player
    currentPlayer = currentPlayer * -1;

    // Change values for current player
    if (currentPlayer === 1){
        currentName = playerOne;
        currentColor = playerOneColor;
        $('h3').text(currentName+": it is your turn");
    }else{
        currentName = playerTwo;
        currentColor = playerTwoColor;
        $('h3').text(currentName+": it is your turn");        
    }
})