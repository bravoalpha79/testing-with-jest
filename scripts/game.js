let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    turnNumber: 0,
    choices: ["button1", "button2", "button3", "button4"],
}

const newGame = () => {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
    for(let circle of document.getElementsByClassName("circle")){
      if(circle.getAttribute("data-listener") !== "true"){
          circle.addEventListener("click", (e) => {
              let move = e.target.getAttribute("id");
              lightsOn(move);
              game.playerMoves.push(move);
              playerTurn();
          })
          circle.setAttribute("data-listener", "true");
      }  
    }
    showScore();
    addTurn();
}

const showScore = () => document.getElementById("score").innerText = game.score;

const addTurn = () => {
    game.playerMoves = [];
    game.currentGame.push(game.choices[Math.floor(Math.random() * 4)]);
    showTurns();
}

const lightsOn = (circle) => {
    document.getElementById(circle).classList.add("light");
    setTimeout(() => {
        document.getElementById(circle).classList.remove("light");
    }, 400);
}

const showTurns = () => {
    game.turnNumber = 0;
    let turns = setInterval(() => {
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if(game.turnNumber >= game.currentGame.length){
            clearInterval(turns);
        }
    }, 800);
}

module.exports = {game, newGame, showScore, addTurn, lightsOn, showTurns};