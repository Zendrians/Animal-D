var scores = [0,0,0,0];
var activePlayer = 0;
var gamePlaying = true;
var revenge = 0;
var unicorn = false;

//DOM
var reportMain = document.querySelector(".reportMain")

// BUTTONS

// 1. Passive button
document.querySelector("#passive").addEventListener("click", function () {
    if (gamePlaying) {
        var diceResult = diceRoll();
        if (diceResult === 1) {
            rollingDrinks(2, activePlayer);
            reportMain.textContent = "Plus two serves for the rolling player!!"
            gamePlaying = false;
        } else if (diceResult === 2) {
            rollingDrinks(1, activePlayer);
            reportMain.textContent = "Plus one serve for the rolling player!!"
            gamePlaying = false;
        } else if (diceResult >= 3 && diceResult <= 5) {
            document.querySelector(".track-p" + activePlayer).classList.toggle("dinactive");
            document.querySelector(".turnScore-p" + activePlayer).innerHTML = " + 0";
            reportMain.textContent = "No serve!!";
            gamePlaying = false;
        } else {
            rollingDrinks(1, activePlayer);
            rollingDrinks(1, nextPlayer());
            reportMain.textContent = "Plus one serve for rolling and next player!!"
            gamePlaying = false;
        }
    } else {
        nextTurn();
    }
})

// 2. Agressive button

document.querySelector("#aggressive").addEventListener("click", function () {
    if (gamePlaying) {
      var diceResult = diceRoll();
        if (diceResult === 1) {
            rollingDrinks(5, activePlayer);
            reportMain.textContent = "The rolling player drinks!!"
            gamePlaying = false;
        } else if (diceResult >= 2 && diceResult <= 4) {
            rollingDrinks(1, activePlayer);
            rollingDrinks(1, nextPlayer());
            reportMain.textContent = "Plus one serve for rolling and next player"
            gamePlaying = false;
        } else if (diceResult === 5) {
            rollingDrinks(1, activePlayer);
            rollingDrinks(2, nextPlayer());
            reportMain.textContent = "One serve for rolling and two for next player!!"
            gamePlaying = false;
        } else {
            rollingDrinks(0, activePlayer);
            rollingDrinks(5, nextPlayer());
            reportMain.textContent = "Next player drinks!"
            gamePlaying = false;
        };
        revenge = 2;
    } else {
        nextTurn();
        
    }
})

// 3. Swap button

document.querySelector("#swap").addEventListener("click", function () {
    if (scores[activePlayer] === 4) {
        if (gamePlaying) {
            var diceResult = diceRoll();
            if (diceResult === 1 || diceResult === 2) {
                scores[activePlayer] += 5;
                document.querySelector(".track-p" + activePlayer).classList.toggle("dinactive");
                document.querySelector(".turnScore-p" + activePlayer).innerHTML = " + D!";
                reportMain.textContent = "The rolling player drinks!!"
                gamePlaying = false;
            } else if (diceResult === 3 || diceResult === 4) {
                var temp = scores[lastPlayer()];
                scores[lastPlayer()] = scores[activePlayer];
                scores[activePlayer] = temp;
                document.querySelector(".track-p" + activePlayer).classList.toggle("dinactive");
                document.querySelector(".track-p" + lastPlayer()).classList.toggle("dinactive");
                document.querySelector(".turnScore-p" + activePlayer).innerHTML = " + S!";
                document.querySelector(".turnScore-p" + lastPlayer()).innerHTML = " + S!";
                reportMain.textContent = "Rolling player swaps drinks to the left!"
                gamePlaying = false;
            } else {
                var temp = scores[nextPlayer()];
                scores[nextPlayer()] = scores[activePlayer];
                scores[activePlayer] = temp;
                document.querySelector(".track-p" + activePlayer).classList.toggle("dinactive");
                document.querySelector(".track-p" + nextPlayer()).classList.toggle("dinactive");
                document.querySelector(".turnScore-p" + activePlayer).innerHTML = " + S!";
                document.querySelector(".turnScore-p" + nextPlayer()).innerHTML = " + S!";
                reportMain.textContent = "Rolling player swaps drinks to the right!"
                gamePlaying = false;
            }
        } else {
            nextTurn();
        }
    } else if (!gamePlaying) {
        nextTurn();
    }
})

// 4. revenge button

document.querySelector("#revenge").addEventListener("click", function () {
    if (revenge === 1) {
        if (gamePlaying) {
            var diceResult = diceRoll();
            if (diceResult >= 1 && diceResult <= 4) {
                rollingDrinks(1, activePlayer);
                reportMain.textContent = "Plus one serve for the rolling player!!"
                gamePlaying = false;
            } else {
                rollingDrinks(0, activePlayer);
                rollingDrinks(5, lastPlayer());
                reportMain.textContent = "Revenge! last turn player drinks!!"
                gamePlaying = false;
            }
        } else {
            nextTurn();
        }
    } else if (!gamePlaying) {
        nextTurn();
    }
})

// 5. Upppsss button

document.querySelector("#chaos").addEventListener("click", function () {
    if (unicorn) {
        if (gamePlaying) {
            var diceResult = diceRoll();
            if (diceResult === 1) {
                for (var i = 0; i < scores.length; i++ ){
                rollingDrinks(5, i);
            };
                reportMain.textContent = "All players drink!!"
                gamePlaying = false;
            } else if (diceResult === 2 || diceResult === 3) {
                for (var i = 0; i < scores.length; i++ ){
                    rollingDrinks(1, i);
                };
                    reportMain.textContent = "Plus one serve for all players!!"
                    gamePlaying = false;
            } else if (diceResult === 4) {
                var temp = scores[0];
                scores[0] = scores[1];
                scores[1] = scores[2];
                scores[2] = scores[3];
                scores[3] = temp;
                for (var i = 0; i < scores.length; i++ ){
                    document.querySelector(".track-p" + i).classList.toggle("dinactive");
                    document.querySelector(".turnScore-p" + i).innerHTML = " + S!";
                }
                reportMain.textContent = "All players swap left!!"
                gamePlaying = false;
            } else if (diceResult === 5) {
                var temp = scores[0];
                scores[0] = scores[3];
                scores[3] = scores[2];
                scores[2] = scores[1];
                scores[1] = temp;
                for (var i = 0; i < scores.length; i++ ){
                    document.querySelector(".track-p" + i).classList.toggle("dinactive");
                    document.querySelector(".turnScore-p" + i).innerHTML = " + S!";
                };
                reportMain.textContent = "All players swap right!!"
                gamePlaying = false;
            } else {
                for (var i = 0; i < scores.length; i++ ){
                    if (i === activePlayer) {
                    rollingDrinks(0, i);
                    } else {
                    rollingDrinks(2, i);
                    };
                    reportMain.textContent = "Plus two serves for all players except rolling player!!"
                    gamePlaying = false;
                };
            }
        } else {
            nextTurn();
        }
    } else if (!gamePlaying) {
        nextTurn();
    }
})

// Rules btn

document.querySelector(".rulesBtn").addEventListener("click", function(){
    document.querySelector("#gameWrap").classList.toggle("noDisplay");
    document.querySelector("#rulesWrap").classList.toggle("noDisplay");
})


// DICE REPETITIVE FUNCTIONS

function rollingDrinks (serve, player) {
    scores[player] += serve;
            document.querySelector(".track-p" + player).classList.toggle("dinactive");
            if (serve === 5){
                serve = "D!"
            }
            document.querySelector(".turnScore-p" + player).innerHTML = " + " + serve;
} 


// FUNCTIONS CORNER

function diceRoll () {
    var result = Math.floor(Math.random() * 6) +1;
    document.querySelector(".dice").data="./SVG/Dice/dice-" + result +".svg"; 
    return result;
}
function unicornRoll () {
    var result = Math.floor(Math.random() * 10) +1;
    return result;
}

function nextPlayer () {
    var nextP;
 if (activePlayer + 1 === 4) {
    nextP = 0;
 } else {
    nextP = activePlayer + 1;
 } 
 return nextP;
}

function lastPlayer () {
    var lastP;
    if (activePlayer - 1 === -1){
        lastP = 3;
    } else {
        lastP = activePlayer -1
    }
    return lastP;
}

function nextTurn () {
    // Hide turn tracks
    for (var i = 0; i < document.querySelectorAll(".track").length; i++){
        document.querySelectorAll(".track")[i].classList.add("dinactive")
    };
    // Reset report
    reportMain.textContent = "Time to Roll!!!";
    // Clean active player UI
    document.querySelector(".player-" + activePlayer).classList.toggle("active");
    for (var i = 0; i < document.querySelectorAll(".btn").length; i++){
        document.querySelectorAll(".btn")[i].classList.remove("playerFill-" + activePlayer);
        };
    // Clear perks
    for (var i = 0; i < document.querySelectorAll(".btnIconsLow").length; i++){
        document.querySelectorAll(".btnIconsLow")[i].classList.remove("perkUp");
        };
    // Set new active player
    activePlayer = nextPlayer();
    // Update scores 
    for (var i = 0; i < scores.length; i++){
        if (scores[i] < 5){
            document.querySelectorAll(".cupServe")[i].textContent = scores[i]
        } else {
            document.querySelectorAll(".cupServe")[i].textContent = "D!";
            scores[i] = 0;
        }
    };
    // Update active player UI
    document.querySelector(".player-" + activePlayer).classList.toggle("active");
    for (var i = 0; i < document.querySelectorAll(".btn").length; i++){
        document.querySelectorAll(".btn")[i].classList.add("playerFill-" + activePlayer);
        };
    // Evaluate perks
    if (scores[activePlayer] === 4){
        document.querySelector("#swapIcon").classList.add("perkUp");
    };
    if (revenge > 0){
        revenge -= 1;
    };
    if (revenge === 1){
        document.querySelector("#revengeIcon").classList.add("perkUp");
    };
    var unicornDice = unicornRoll();
    if (unicornDice === 10){
        unicorn = true;
        document.querySelector("#chaosIcon").classList.add("perkUp");
    } else {
        unicorn = false;
    }
    // Resume gameplay
    gamePlaying = true;
}