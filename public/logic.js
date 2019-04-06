var scores = [0,0,0,0];
var activePlayer = 0;
var gamePlaying = true;
var revenge = 0;
var unicorn = false;


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
        } else if (diceResult === 2) {
            scores[activePlayer] += 1;
            document.querySelector(".track-p" + activePlayer).classList.toggle("dinactive");
            document.querySelector(".turnScore-p" + activePlayer).innerHTML = " + &nbsp1";
            document.querySelector(".reportMain").textContent = "Plus one serve for the rolling player!!"
            gamePlaying = false;
        } else if (diceResult >= 3 && diceResult <= 5) {
            document.querySelector(".track-p" + activePlayer).classList.toggle("dinactive");
            document.querySelector(".turnScore-p" + activePlayer).innerHTML = " + &nbsp0";
            document.querySelector(".reportMain").textContent = "No serve!!";
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
            document.querySelector(".turnScore-p" + activePlayer).innerHTML = " + &nbsp0";
            document.querySelector(".turnScore-p" + nextPlayer()).innerHTML = " + &nbspD!";
            document.querySelector(".reportMain").textContent = "Next player drinks!"
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
            } else {
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
                scores[activePlayer] += 1;
                document.querySelector(".track-p" + activePlayer).classList.toggle("dinactive");
                document.querySelector(".turnScore-p" + activePlayer).innerHTML = " + &nbsp1";
                document.querySelector(".reportMain").textContent = "Plus one serve for the rolling player!!"
                gamePlaying = false;
            } else {
                scores[lastPlayer()] += 5;
                document.querySelector(".track-p" + activePlayer).classList.toggle("dinactive");
                document.querySelector(".track-p" + lastPlayer()).classList.toggle("dinactive");
                document.querySelector(".turnScore-p" + activePlayer).innerHTML = " + &nbsp0";
                document.querySelector(".turnScore-p" + lastPlayer()).innerHTML = " + &nbspD!";
                document.querySelector(".reportMain").textContent = "Revenge! last turn player drinks!"
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
                scores[i] += 5;
                document.querySelector(".track-p" + i).classList.toggle("dinactive");
                document.querySelector(".turnScore-p" + i).innerHTML = " + &nbspD!";
            };
                document.querySelector(".reportMain").textContent = "All players drink!!"
                gamePlaying = false;
            } else if (diceResult === 2 || diceResult === 3) {
                for (var i = 0; i < scores.length; i++ ){
                    scores[i] += 1;
                    document.querySelector(".track-p" + i).classList.toggle("dinactive");
                    document.querySelector(".turnScore-p" + i).innerHTML = " + &nbsp1";
                };
                    document.querySelector(".reportMain").textContent = "Plus one serve for all players!!"
                    gamePlaying = false;
            } else if (diceResult === 4) {
                var temp = scores[0];
                scores[0] = scores[1];
                scores[1] = scores[2];
                scores[2] = scores[3];
                scores[3] = temp;
                for (var i = 0; i < scores.length; i++ ){
                    document.querySelector(".track-p" + i).classList.toggle("dinactive");
                    document.querySelector(".turnScore-p" + i).innerHTML = " + &nbspS!";
                }
                document.querySelector(".reportMain").textContent = "All players swap left!!"
                gamePlaying = false;
            } else if (diceResult === 5) {
                var temp = scores[0];
                scores[0] = scores[3];
                scores[3] = scores[2];
                scores[2] = scores[1];
                scores[1] = temp;
                for (var i = 0; i < scores.length; i++ ){
                    document.querySelector(".track-p" + i).classList.toggle("dinactive");
                    document.querySelector(".turnScore-p" + i).innerHTML = " + &nbspS!";
                };
                document.querySelector(".reportMain").textContent = "All players swap right!!"
                gamePlaying = false;
            } else {
                for (var i = 0; i < scores.length; i++ ){
                    if (i === activePlayer) {
                    document.querySelector(".track-p" + i).classList.toggle("dinactive");
                    document.querySelector(".turnScore-p" + i).innerHTML = " + &nbsp0";
                    } else {
                    scores[i] += 2;
                    document.querySelector(".track-p" + i).classList.toggle("dinactive");
                    document.querySelector(".turnScore-p" + i).innerHTML = " + &nbsp2";
                    };
                    document.querySelector(".reportMain").textContent = "Plus two serves for all players except rolling player!!"
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


// Functions Corner
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
    document.querySelector(".reportMain").textContent = "Time to Roll!!!";
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