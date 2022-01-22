// Global Variables
const players = [];
let maxScore = 0;
let trick = 1;
let gameOver = false;

var todaysdate = Date();
document.getElementById("date").innerHTML = todaysdate;


function clearDiv() {
  document.getElementById("main-content").innerHTML = ""
}


function showNameFields() {
  document.getElementById("main-content").innerHTML +=
    "<h5>Please Enter 3-5 players</h5><label for='player1'>Player 1: </label>\<input type='text' id='player1' name='players'>\<br><label for='player2'>Player 2: </label>\<input type='text' id='player2' name='players'>\<br><label for='player3'>Player 3: </label>\<input type='text' id='player3' name='players'>\<br><label for='player4'>Player 4: </label>\<input type='text' id='player4' name='players'>\<br><label for='player5'>Player 5: </label>\<input type='text' id='player5' name='players'>\<br><button type='button' class='btn btn-light btn-small' onclick='getNames()' id='getNamesButton'>Set Players</button>"
}


function getNames() {
  let player0 = document.getElementById("player1").value;
  let player1 = document.getElementById("player2").value;
  let player2 = document.getElementById("player3").value;
  let player3 = document.getElementById("player4").value;
  let player4 = document.getElementById("player5").value;

  players.push(player0);
  players.push(player1);
  players.push(player2);
  players.push(player3);
  players.push(player4);
  
  function checkEmpty(value, index, array) {
    //console.log("Value = " + value);
    //console.log("Index = " + index);
    //console.log("Array = " + array);
    if (value == "") {
      players.splice(index, 1);
    }
  }
  
  function createPlayer(value, index, array) {
    window['player' + index] = {name: value, lose: false, win: false, score: 0};
  }
  players.forEach(checkEmpty);
  players.forEach(checkEmpty);
  players.forEach(checkEmpty);
  players.forEach(createPlayer);
  clearDiv()
  showScoreField();
}


function showScoreField() {
  document.getElementById("main-content").innerHTML =
    "<h5>Score to play to (ie 100)</h5>\<br><label for='score'>Score: </label>\<input type='number' value=100 id='score' name='score'>\<br><button type='button' class='btn btn-light btn-small' onclick='getScoreValue()' id='getScoreValue'>Set Score</button>"
}


function getScoreValue() {
  maxScore = parseInt(document.getElementById("score").value);
  //console.log("Score: " + maxScore);
  clearDiv();
  showMainScreen();
}


function gameIsOver() {

  function showPlayersScore(value, index, array) {
    htmlstring = "<p>" + window["player" + index].name + ": " + window["player" + index].score + "</p>";
    html += htmlstring;
  }

  function getFinalScore(value, index, array) {
    playersFinalScore.push(window["player" + index].score); 
  }

  function findMin() {
    let min = Math.min(...playersFinalScore);
    //console.log("MIN: " + min);
    return min;
  }
  
  function findWinner(value, index, array) {
    //console.log("INSIDE FIND WINNER: ");
    //console.log("MIN INSIDE: " + min);
    if (window["player" + index].score == min) {
      window["player" + index].win = true;
    }
  }

  function showWinner(value, index, array) {
    if (window["player" + index].win == true) {
      html += "<p>" + window["player" + index].name + " Wins!</p>";
    }
  }

  function startAgain() {
    location.reload(true);
  }

  clearDiv();
  let html = "<h5>Game Over!</h5>";
  players.forEach(showPlayersScore);
  let playersFinalScore = []
  players.forEach(getFinalScore);
  //console.log("PLAYERS FINAL SCORE: " + playersFinalScore);
  let min = findMin();
  players.forEach(findWinner);
  players.forEach(showWinner);
  
  addButton = "<br><button type='button' class='btn btn-light btn-small' id='playAgain'>Play Again</button>";
  html += addButton;
  document.getElementById("main-content").innerHTML = html;
  document.getElementById("playAgain").addEventListener("click", startAgain, false);
}


// This is the main loop where scores are taken and added up
// until someone breaks maxScore
//
function showMainScreen() {
  
  function showPlayersScore(value, index, array) {
    htmlstring = "<p>" + window["player" + index].name + ": " + window["player" + index].score + "</p>";
    html += htmlstring;
  }

  function showScore(value, index, array) {
    htmlstring = "<p>" + window["player" + index].name + ": " + "<input type='number' value=0 id='" + window["player" + index].name + "score' name='score'>";
    html += htmlstring;
  }
 
  function addScore(value, index, array) {
    //console.log("Add Score for player " + window["player" + index].name)
    trickpoints = document.getElementById(window["player" + index].name + 'score').value;
    //console.log("Trickpoints: " + trickpoints)
    //console.log("Trickpoints type: " + typeof(trickpoints))
    let trickpointint = parseInt(trickpoints)
    //console.log("Trickpointint: " + trickpointint)
    //console.log("Trickpointint type: " + typeof(trickpointint))
    window["player" + index].score += trickpointint;
  }

  function checkScore(value, index, array) {
    if (window["player" + index].score >= maxScore) {
      //console.log("PLAYER HAS LOST DO SOMETHING ABOUT IT");
      window["player" + index].lose = true;
      gameOver = true;
    } else {
      //console.log("GAME CONTINUES");
    }
  }

  function scoreButton() {
    players.forEach(addScore);
    players.forEach(checkScore);
    trick += 1;
    if (gameOver == false) {
      showMainScreen();
    } else {
      gameIsOver();
    }

  }

  // This is what shows all of the info for the game
  // Above this are all functions to do all of the things :P
  
  let html = "<h5>Game: </h5>";

  html += "<h6> Trick: " + trick + "</h6>";

  if (trick % 2 == 0) {
    html += "<p>Pass Cards Right</p>";
  } else {
    html += "<p>Pass Cards Left</p>";
  }
  html += "<p>Points: </p>"

  players.forEach(showPlayersScore); 
  html += "<h5> Add Points: </h5>";
  players.forEach(showScore); 
  addButton = "<br><button type='button' class='btn btn-light btn-small' id='addScore'>Add Score</button>";
  html += addButton;
  document.getElementById("main-content").innerHTML = html;
  document.getElementById("addScore").addEventListener("click", scoreButton, false);
}


// Main program start
showNameFields();



