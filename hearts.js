// Global Variables
const players = [];


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
    console.log("Value = " + value);
    console.log("Index = " + index);
    console.log("Array = " + array);
    if (value == "") {
      players.splice(index, 1);
    }
  }
  
  function createPlayer(value, index, array) {
    window['player' + index] = {name: value, win: false, score: 0};
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
  let score = document.getElementById("score").value;
  console.log("Score: " + score);
  clearDiv();
  showMainScreen();
}


function showMainScreen() {
  
  function showPlayersScore(value, index, array) {
    htmlstring = "<p>" + window["player" + index].name + ": " + window["player" + index].score + "</p>";
    html += htmlstring;
  }

  function showScore(value, index, array) {
    htmlstring = "<p>" + window["player" + index].name + ": " + "<input type='number' value=0 id='" + window["player" + index].name + "score' name=score>";
    html += htmlstring;
  }
 
  function addScore(value, index, array) {
    trickpoints = document.getElementById(window["player" + index].name + 'score').value;
    window["player" + index].score += trickpoints;
    showMainScreen();
  }

  function scoreButton() {
    players.forEach(addScore);
  }

  let html = "<h5>MAIN SCREEN</h5>";
  players.forEach(showPlayersScore); 
  players.forEach(showScore); 
  addButton = "<br><button type='button' class='btn btn-light btn-small' id='addScore'>Add Score</button>";
  html += addButton
  document.getElementById("main-content").innerHTML = html
  document.getElementById("addScore").addEventListener("click", scoreButton, false);
}
  // Main program start
  showNameFields()




