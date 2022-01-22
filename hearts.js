    var todaysdate = Date();
    document.getElementById("date").innerHTML = todaysdate;
         
    function clearDiv() {
      document.getElementById("main-content").innerHTML = ""
    }

    function showNameFields() {
      document.getElementById("main-content").innerHTML += 
        "<label for='player1'>Player 1: </label>\<input type='text' id='player1' name='players'>\<br><label for='player2'>Player 2: </label>\<input type='text' id='player2' name='players'>\<br><label for='player3'>Player 3: </label>\<input type='text' id='player3' name='players'>\<br><label for='player4'>Player 4: </label>\<input type='text' id='player4' name='players'>\<br><label for='player5'>Player 5: </label>\<input type='text' id='player5' name='players'>\<br><button type='button' class='btn btn-light btn-small' onclick='getNames()' id='getNamesButton'>Set Players</button>" 
    }

    function getNames() {
      const players = []
      let player1 = document.getElementById("player1").value;
      let player2 = document.getElementById("player2").value;
      let player3 = document.getElementById("player3").value;
      let player4 = document.getElementById("player4").value;
      let player5 = document.getElementById("player5").value;
      
      players.push(player1); 
      players.push(player2); 
      players.push(player3); 
      players.push(player4); 
      players.push(player5); 
      function checkEmpty(value, index, array) {
        console.log("Value = " + value);
        console.log("Index = " + index);
        console.log("Array = " + array);
        if (value == "") {
          players.splice(index, 1);
        }
      }
      players.forEach(checkEmpty);
      players.forEach(checkEmpty);
      players.forEach(checkEmpty);
      clearDiv()
      showScoreField();
      return players;
    }

    function showScoreField() {
      document.getElementById("main-content").innerHTML = 
        "<p>Score to play to (ie 100)</p>\<br><label for='score'>Score: </label>\<input type='number' value=100 id='score' name='score'>\<br><button type='button' class='btn btn-light btn-small' onclick='getScoreValue()' id='getScoreValue'>Set Score</button>" 
    }
    function getScoreValue() {
      let score = document.getElementById("score").value;
      console.log("Score: " + score);
    }

    <!--Main program start-->
    showNameFields()




