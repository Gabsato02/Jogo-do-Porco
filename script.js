// Classe player - define os atributos e métodos que um player terá, entre eles: rolar e parar o dado, limpar e anotar seus pontos
class player {
    constructor(name, points, totalPoints) {
        this.name = name;
        this.points = points;
        this.totalPoints = totalPoints;
    }

    rollDice() {
        game.identifyCurrentPlayer();
        dice.roll();
        game.verifyDice();
    }

    clearPoints() {
        this.points = 0;
        this.notePoints();
    }

    clearAllPoints() {
        this.points = 0;
        this.totalPoints = 0;
        this.notePoints();
    }

    notePoints() {
        game.gameWin();
        document.getElementById(`${this.name}-temporary-points`).innerHTML = this.points;
        document.getElementById(`${this.name}-total-points`).innerHTML = this.totalPoints;
    }

    stopDice() {
        this.addTemporaryPoints();
        game.changePlayer();
    }

    addTemporaryPoints() {
        this.totalPoints += this.points;
    }
}

// Novas instâncias da classe player
let player1 = new player("player1", 0, 0);
let player2 = new player("player2", 0, 0);
let player3 = new player("player3", 0, 0);
let player4 = new player("player4", 0, 0);
let player5 = new player("player5", 0, 0);
let player6 = new player("player6", 0, 0);

// O objeto Dado e seus atributos, entre eles: rolar e mostrar os números
let dice = {
    diceValue: null,
    roll: function () {
        this.diceValue = Math.floor(Math.random() * 6) + 1;
        this.changeDice();
        console.log(this.diceValue);
        game.disableSelectors();
        game.identifyCurrentPlayer();
    },
    changeDice: function () {
        this.animateDice();
        document.getElementById("diceImage").src = `img/${this.diceValue}.png`;
        setTimeout(this.deanimateDice, 1000);
    },
    animateDice: function () {
        document.getElementById("diceImage").classList.add("rotate");
    },
    deanimateDice: function () {
        document.getElementById("diceImage").classList.remove("rotate");
    },
}

// O objeto Jogo que dá o funcionamento com seus atributos, entre eles a mecânica, a identificação dos turnos e a verificação dos dados
let game = {
    players: function () {
        let numberOfPlayers = parseInt(document.getElementById("playersNumber").value);

        switch (numberOfPlayers) {
            case 2:
                return [player1, player2];
                break;
            case 3:
                return [player1, player2, player3];
                break;
            case 4:
                return [player1, player2, player3, player4];
                break;
            case 5:
                return [player1, player2, player3, player4, player5];
                break;
            case 6:
                return [player1, player2, player3, player4, player5, player6];
                break;
            default:
                return [player1, player2];
        }
    },
    currentPlayer: 0,
    verifyCurrentPlayer: function () {
        return this.players()[this.currentPlayer];
    },
    identifyCurrentPlayer: function () {
        let bgActiveColor = "#32CD32";
        let fontActiveColor = "white";

        this.changeColors((this.currentPlayer + 1), bgActiveColor, fontActiveColor);
    },
    changeColors: function changeColors(ID, bgColor, fontColor) {
        document.getElementById(`player${ID}-card`).style.backgroundColor = bgColor;
        document.getElementById(`player${ID}-card`).style.color = fontColor;
    },
    verifyDice: function () {
        if (dice.diceValue === 1) {
            this.changePlayer();
        } else {
            this.verifyCurrentPlayer().points += dice.diceValue;
            this.verifyCurrentPlayer().notePoints();
        }
    },
    changePlayer: function () {
        let bgChangeColor = "white";
        let fontChangeColor = "black";
        this.changeColors((this.currentPlayer + 1), bgChangeColor, fontChangeColor);

        this.verifyCurrentPlayer().clearPoints();
        this.currentPlayer++;

        if (this.currentPlayer == this.players().length) {
            this.currentPlayer = 0;
        }
    },
    newGame: function () {
        let bgChangeColor = "white";
        let fontChangeColor = "black";
        this.enableSelectors();
        for (let i = 0; i < this.players().length; i++) {
            this.changeColors((this.currentPlayer + 1), bgChangeColor, fontChangeColor);
            this.players()[i].clearAllPoints();
            this.currentPlayer = 0;
        }
        document.getElementById("winner").innerHTML = "";
    },
    disableSelectors: function () {
        document.getElementById("gameLimit").disabled = true;
        document.getElementById("playersNumber").disabled = true;
    },
    enableSelectors: function () {
        document.getElementById("gameLimit").disabled = false;
        document.getElementById("playersNumber").disabled = false;
    },
    gameWin: function () {
        for (let i = 0; i < this.players().length; i++) {
            if (this.verifyCurrentPlayer().totalPoints >= parseInt(document.getElementById("gameLimit").value)) {
                document.getElementById("winner").innerHTML = `O vencedor é o ${this.verifyCurrentPlayer().name} com ${this.verifyCurrentPlayer().totalPoints} pontos.`;
            }
        }
    }
}