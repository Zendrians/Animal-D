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

function nextTurn () {
    // Hide turn tracks
    for (var i = 0; i < document.querySelectorAll(".track").length; i++){
        document.querySelectorAll(".track")[i].classList.add("dinactive")
    };
    // Update scores
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
    // Set new active player an UI
    activePlayer = nextPlayer();
    document.querySelector(".player-" + activePlayer).classList.toggle("active");
    for (var i = 0; i < document.querySelectorAll(".btn").length; i++){
        document.querySelectorAll(".btn")[i].classList.add("playerFill-" + activePlayer);
        }
    // Resume gameplay
    gamePlaying = true;

}