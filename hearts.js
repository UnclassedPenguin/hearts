// UnclassedPenguin Hearts points tracker
// A javascript program for tracking points in hearts,
// cause I'm lazy mostly and don't want to do the math in 
// my head during a game :P
// 
//  Written by: Tyler(UnclassedPenguin)
//      GitHub: https://github.com/UnclassedPenguin
// This GitHub: https://github.com/UnclassedPenguin/hearts.git
//        Site: https://unclassed.ca
//
//


// Global Variables
//
// List of players
var players = [];
// Max score to play the game to, this is set later on by the player
var maxScore = 0;
// Trick number, helps keep track of which direction to pass cards
// at the beginning of a trick
var trick = 1;
// Variable to change when someone has broken max score and signal
// that the game is over
var gameOver = false;


// Get date and print to date div
const d = new Date();
var downame = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
var dowint = d.getDay();
var dow = downame[dowint];
var day = d.getDate();
var monthname = ["January", "February", "March", "April", "May", "June",
                 "July", "August", "September", "October", "November", "December"];
var monthint = d.getMonth();
var month = monthname[monthint];
var year = d.getFullYear()

// Function to display time correctly ie 09, instead of 9
function addZero(i) {
  if (i < 10) {i = "0" + i}
  return i;
}

let h = addZero(d.getHours());
let m = addZero(d.getMinutes());
let time = h + ":" + m;

var datestring = dow + ", " + month + " " + day + " " + year + " " + time;
document.getElementById("date").innerHTML = datestring;


// Function to clear out the main-content div
function clearDiv() {
  document.getElementById("main-content").innerHTML = "";
}


//Start of "program", asks for names of players
function showNameFields() {
  document.getElementById("main-content").innerHTML =
    "<h5>Please Enter 3-5 players</h5><form><p class='rowp'><label for='player1'>Player 1: </label><input type='text' id='player1' name='players'></p><p class='rowp'><label for='player2'>Player 2: </label><input type='text' id='player2' name='players'></p><p class='rowp'><label for='player3'>Player 3: </label><input type='text' id='player3' name='players'></p><p class='rowp'><label for='player4'>Player 4: </label><input type='text' id='player4' name='players'></p><p class='rowp'><label for='player5'>Player 5: </label><input type='text' id='player5' name='players'></p></form><button type='button' class='btn btn-light btn-small' id='getNamesButton'>Set Players</button>";
  document.getElementById("getNamesButton").addEventListener("click", getNames, false);
}


// Function to grab the names in the name fields,
// Gets the names and adds them to a players list
// also creates player objects to keep track of score
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
  
  // Checks if there are empty values in the list, and 
  // removes them
  function checkEmpty(value, index, array) {
    //console.log("Value = " + value);
    //console.log("Index = " + index);
    //console.log("Array = " + array);
    if (value == "") {
      players.splice(index, 1);
    }
  }
 
  // Creates an object of all players in the players list
  // called: player0, player1, player2, etc...
  function createPlayer(value, index, array) {
    window['player' + index] = {name: value, lose: false, win: false, score: 0};
  }

  players.forEach(checkEmpty);
  players.forEach(checkEmpty);
  players.forEach(checkEmpty);
  players.forEach(createPlayer);
  clearDiv();
  showScoreField();
}


// Displays html to ask for input on what the Max Score should be
function showScoreField() {
  document.getElementById("main-content").innerHTML =
    "<br><h5>Score to play to (ie 100)</h5>\<br><label for='score'>Score: </label>\<input type='number' value=100 id='score' name='score'>\<br><button type='button' class='btn btn-light btn-small' id='getScoreValue'>Set Score</button>";
  document.getElementById("getScoreValue").addEventListener("click", getScoreValue, false);
}


// Function to grab the max score value (as maxScore) and go to next
// section
function getScoreValue() {
  maxScore = parseInt(document.getElementById("score").value);
  //console.log("Score: " + maxScore);
  clearDiv();
  showMainScreen();
}


// This is the main loop where scores are taken and added up
// until someone breaks maxScore
function showMainScreen() {
  
  // Displays players score updates on button click
  // forEach player
  function showPlayersScore(value, index, array) {
    htmlstring = "<tr><th class='righta'>" + window["player" + index].name + ": </th><th>" + window["player" + index].score + "</th></tr>";
    html += htmlstring;
  }

  // This displays the input fields to gather the scores 
  function showScore(value, index, array) {
    htmlstring = "<tr><th class='righta'>" + window["player" + index].name + ": </th><th>" + "<input type='number' value=0 id='" + window["player" + index].name + "score' name='score'></th></tr>";
    html += htmlstring;
  }

  // This gets the values of the input fields and adds to each players total score 
  // player.score
  function addScore(value, index, array) {
    trickpoints = document.getElementById(window["player" + index].name + 'score').value;
    let trickpointint = parseInt(trickpoints);
    window["player" + index].score += trickpointint;
  }

  // This runs every "loop" and checks player.score values against
  // maxScore to see if anyone has lost, if they have, 
  // it sets gameOver to true
  function checkScore(value, index, array) {
    if (window["player" + index].score >= maxScore) {
      //console.log("PLAYER HAS LOST DO SOMETHING ABOUT IT");
      window["player" + index].lose = true;
      gameOver = true;
    } 
  }

  // Function that runs when "Add to score" button is pressed. Calls other functions 
  // to add scores and check scores against maxScore if gameOver is
  // equal to true here it switches to gameIsOver function to display
  // final scores and who has won the game
  function scoreButton() {
    players.forEach(addScore);
    players.forEach(checkScore);
    if (gameOver == false) {
      trick += 1;
      showMainScreen();
    } else {
      gameIsOver();
    }
  }

  // This is what shows all of the info for the game
  // Above this are all functions to do all of the things :P
  let html = "<h5>Game: </h5>";
  if (trick % 2 == 0) {
    html += "<p>Pass Cards Right</p>";
  } else {
    html += "<p>Pass Cards Left</p>";
  }
  html += "<table><tr><th>Trick: </th><th>" + trick + "</th></tr>";
  html += "<tr><th>Points: </th><th></th></tr>";
  players.forEach(showPlayersScore); 
  html += "<tr><th> <h5> Add Points: </h5> </th></tr>";
  players.forEach(showScore); 
  html += "</table>";
  addButton = "<br><div class='text-center'><button type='button' class='btn btn-light btn-small' id='addScore'>Add To Score</button></div>";
  html += addButton;
  document.getElementById("main-content").innerHTML = html;
  document.getElementById("addScore").addEventListener("click", scoreButton, false);
}


// Function that runs when a player has exceeded the maxScore value
// Ties have not been dealt with yet. As it stands, if someone
// breaks the maxScore and two or more players are tied, the game
// is still considered over and they both are considered to have
// won. Not sure at the moment how to deal with this, will figure it out
// some other time :P
function gameIsOver() {

  // Prints players final score
  function showPlayersScore(value, index, array) {
    htmlstring = "<tr><th class='righta'>" + window["player" + index].name + ": </th><th>" + window["player" + index].score + "</th></tr>";
    html += htmlstring;
  }

  // Gets players final score and puts it in a list to compare to see who had
  // lowest score (who won)
  function getFinalScore(value, index, array) {
    playersFinalScore.push(window["player" + index].score); 
  }

  // Finds the min value in the list (playersFinalScore) to 
  // determine who had low score to see who won
  function findMin() {
    let min = Math.min(...playersFinalScore);
    //console.log("MIN: " + min);
    return min;
  }
  
  // Compares players final score with min to see if they are the one who won,
  // If it matches marks player object win variable (player.win) to true
  function findWinner(value, index, array) {
    //console.log("INSIDE FIND WINNER: ");
    //console.log("MIN INSIDE: " + min);
    if (window["player" + index].score == min) {
      window["player" + index].win = true;
    }
  }

  // Displays the name of who won
  function showWinner(value, index, array) {
    if (window["player" + index].win == true) {
      html += "<br><h4>" + window["player" + index].name + " Wins!</h4>";
    }
  }

  // Function for the play again button. Just refreshes the page,
  // and you can start over
  function startAgain() {
    location.reload(true);
  }
  
  // Main area of this function that sets up all the html and
  // order of the inner functions
  clearDiv();
  let html = "<h4>Game Over!</h4><br>";
  html += "<h5>Won in " + trick + " tricks.</h5>";
  html += "<h5>Final Points:</h5>";
  html += "<table>";
  players.forEach(showPlayersScore);
  html += "</table>";
  let playersFinalScore = [];
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


// Main program start
showNameFields();
