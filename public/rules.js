var selectedIcon = 0

var fullRules = [

{
    icon: "./SVG/Rules/0.svg",
    name: "Passive",
    roll: [
        "Rolling player plus two serves",
        "Rolling player plus one serve",
        "No serve, nothing happens",
        "No serve, nothing happens",
        "No serve, nothing happens",
        "One serve for rolling player and next player"
    ]
},

{
    icon: "./SVG/Rules/1.svg",
    name: "Agressive",
    roll: [
        "Rolling player drinks",
        "One serve for rolling player and next player",
        "One serve for rolling player and next player",
        "One serve for rolling player and next player",
        "One serve for rolling player and two for next",
        "Next player drinks"
    ]
},

{
    icon: "./SVG/Rules/2.svg",
    name: "Swap Frog",
    roll: [
        "Rolling player drinks",
        "Rolling player drinks",
        "Swap with the player to the left",
        "Swap with the player to the left",
        "Swap with the player to the right",
        "Swap with the player to the right"
    ]
},

{
    icon: "./SVG/Rules/3.svg",
    name: "Revenge Gorilla",
    roll: [
        "One serve for rolling player",
        "One serve for rolling player",
        "One serve for rolling player",
        "One serve for rolling player",
        "Last player drinks",
        "Last player drinks"
    ]
},

{
    icon: "./SVG/Rules/4.svg",
    name: "Upppss Unicorn",
    roll: [
        "All players drink",
        "One serve for all players",
        "One serve for all players",
        "All players swap with their player to the left ",
        "All players swap with their player to the right",
        "two 2 serves for all players exept the roling player"
    ]
},

]

document.querySelector("#btn-arrow-right").addEventListener("click", function(){
    selectedIcon = nextRule();
    updateRule();
})

document.querySelector("#btn-arrow-left").addEventListener("click", function(){
    selectedIcon = lastRule();
    updateRule();;
})

function updateRule() {
    document.querySelector("#current-rules-icon").data = fullRules[selectedIcon].icon;
    document.querySelector(".icon-name-wrap").textContent = fullRules[selectedIcon].name;
    for (var i = 0; i < document.querySelectorAll(".number-text").length; i++){
        document.querySelector("#number-" + i).textContent = fullRules[selectedIcon].roll[i]
    }
}

function nextRule () {
    var nextR;
 if (selectedIcon + 1 === 5) {
    nextR = 0;
 } else {
    nextR = selectedIcon + 1;
 } 
 return nextR;
}

function lastRule () {
    var lastR;
    if (selectedIcon - 1 === -1){
        lastR = 4;
    } else {
        lastR = selectedIcon -1
    }
    return lastR;
}