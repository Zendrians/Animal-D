var scores = [0,0,0,0];
var activePlayer = 0;
var gamePlaying = true;

// 0. Dice next player button
document.querySelector(".diceScreen").addEventListener("click", function(){
    if (!gamePlaying){
        nextTurn();
    }
})


// 1. Passive button
document.querySelector("#passive").addEventListener("click", function () {
    if (gamePlaying) {
        var diceResult = diceRoll();
        if (diceResult === 1) {
            scores[activePlayer] += 2;
            document.querySelector(".track-p" + activePlayer).classList.toggle("dinactive");
            document.querySelector(".turnScore-p" + activePlayer).innerHTML = " + &nbsp2";
            document.querySelector(".reportMain").textContent = "Plus two serves for the rolling player!!"
            gamePlaying = false;
        } else if (diceResult >= 2 && diceResult <= 4) {
            document.querySelector(".track-p" + activePlayer).classList.toggle("dinactive");
            document.querySelector(".turnScore-p" + activePlayer).innerHTML = " + &nbsp-";
            document.querySelector(".reportMain").textContent = "No serve!!";
            gamePlaying = false;
        } else if (diceResult === 5) {
            scores[activePlayer] += 1;
            document.querySelector(".track-p" + activePlayer).classList.toggle("dinactive");
            document.querySelector(".turnScore-p" + activePlayer).innerHTML = " + &nbsp1";
            document.querySelector(".reportMain").textContent = "Plus one serve for the rolling player!!"
            gamePlaying = false;
        } else {
            scores[activePlayer] += 1;
            scores[nextPlayer()] += 1;
            document.querySelector(".track-p" + activePlayer).classList.toggle("dinactive");
            document.querySelector(".track-p" + nextPlayer()).classList.toggle("dinactive");
            document.querySelector(".turnScore-p" + activePlayer).innerHTML = " + &nbsp1";
            document.querySelector(".turnScore-p" + nextPlayer()).innerHTML = " + &nbsp1";
            document.querySelector(".reportMain").textContent = "Plus 1 serve for rolling and next player"
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
            scores[activePlayer] += 5;
            document.querySelector(".track-p" + activePlayer).classList.toggle("dinactive");
            document.querySelector(".turnScore-p" + activePlayer).innerHTML = " + &nbspD!";
            document.querySelector(".reportMain").textContent = "The rolling player drinks!!"
            gamePlaying = false;
        } else if (diceResult >= 2 && diceResult <= 4) {
            scores[activePlayer] += 1;
            scores[nextPlayer()] += 1;
            document.querySelector(".track-p" + activePlayer).classList.toggle("dinactive");
            document.querySelector(".track-p" + nextPlayer()).classList.toggle("dinactive");
            document.querySelector(".turnScore-p" + activePlayer).innerHTML = " + &nbsp1";
            document.querySelector(".turnScore-p" + nextPlayer()).innerHTML = " + &nbsp1";
            document.querySelector(".reportMain").textContent = "Plus 1 serve for rolling and next player"
            gamePlaying = false;
        } else if (diceResult === 5) {
            scores[activePlayer] += 1;
            scores[nextPlayer()] += 2;
            document.querySelector(".track-p" + activePlayer).classList.toggle("dinactive");
            document.querySelector(".track-p" + nextPlayer()).classList.toggle("dinactive");
            document.querySelector(".turnScore-p" + activePlayer).innerHTML = " + &nbsp1";
            document.querySelector(".turnScore-p" + nextPlayer()).innerHTML = " + &nbsp2";
            document.querySelector(".reportMain").textContent = "Plus 1 serve for rolling and two for next player!"
            gamePlaying = false;
        } else {
            scores[nextPlayer()] += 5;
            document.querySelector(".track-p" + activePlayer).classList.toggle("dinactive");
            document.querySelector(".track-p" + nextPlayer()).classList.toggle("dinactive");
            document.querySelector(".turnScore-p" + activePlayer).innerHTML = " + &nbsp-";
            document.querySelector(".turnScore-p" + nextPlayer()).innerHTML = " + &nbspD!";
            document.querySelector(".reportMain").textContent = "Next player drinks!"
            gamePlaying = false;

        }
    } else {
        nextTurn();
    }
})

// 3. Swap button

document.querySelector("#swap").addEventListener("click", function () {
    if (gamePlaying) {
        var diceResult = diceRoll();
        if (diceResult === 1 || diceResult === 2) {
            scores[activePlayer] += 5;
            document.querySelector(".track-p" + activePlayer).classList.toggle("dinactive");
            document.querySelector(".turnScore-p" + activePlayer).innerHTML = " + &nbspD!";
            document.querySelector(".reportMain").textContent = "The rolling player drinks!!"
            gamePlaying = false;
        } else if (diceResult === 3 || diceResult === 4) {
            var temp = scores[lastPlayer()];
            scores[lastPlayer()] = scores[activePlayer];
            scores[activePlayer] = temp;
            document.querySelector(".track-p" + activePlayer).classList.toggle("dinactive");
            document.querySelector(".track-p" + lastPlayer()).classList.toggle("dinactive");
            document.querySelector(".turnScore-p" + activePlayer).innerHTML = " + &nbspS!";
            document.querySelector(".turnScore-p" + lastPlayer()).innerHTML = " + &nbspS!";
            document.querySelector(".reportMain").textContent = "Rolling player swaps drinks to the left!"
            gamePlaying = false;
        }  else {
            var temp = scores[nextPlayer()];
            scores[nextPlayer()] = scores[activePlayer];
            scores[activePlayer] = temp;
            document.querySelector(".track-p" + activePlayer).classList.toggle("dinactive");
            document.querySelector(".track-p" + nextPlayer()).classList.toggle("dinactive");
            document.querySelector(".turnScore-p" + activePlayer).innerHTML = " + &nbspS!";
            document.querySelector(".turnScore-p" + nextPlayer()).innerHTML = " + &nbspS!";
            document.querySelector(".reportMain").textContent = "Rolling player swaps drinks to the right!"
            gamePlaying = false;
        }
    } else {
        nextTurn();
    }
})








// Functions Corner
function diceRoll () {
    var result = Math.floor(Math.random() * 6) +1;
    document.querySelector(".dice").data="./SVG/Dice/dice-" + result +".svg"; 
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
    // Update scores internally
    for (var i = 0; i < document.querySelectorAll(".cupServe").length; i++){
        if (scores[i] < 5){
            document.querySelectorAll(".cupServe")[i].textContent = scores[i]
        } else {
            document.querySelectorAll(".cupServe")[i].textContent = "D!";
            scores[i] = 0;
        }
    };
    // Reset report
    document.querySelector(".reportMain").textContent = "Time to Roll!!!";
    // Clean active player UI
    document.querySelector(".player-" + activePlayer).classList.toggle("active");
    for (var i = 0; i < document.querySelectorAll(".btn").length; i++){
        document.querySelectorAll(".btn")[i].classList.remove("playerFill-" + activePlayer);
        }
    // Set new active player
    activePlayer = nextPlayer();
    // Update active player UI
    document.querySelector(".player-" + activePlayer).classList.toggle("active");
    for (var i = 0; i < document.querySelectorAll(".btn").length; i++){
        document.querySelectorAll(".btn")[i].classList.add("playerFill-" + activePlayer);
        }
    // Resume gameplay
    gamePlaying = true;

}