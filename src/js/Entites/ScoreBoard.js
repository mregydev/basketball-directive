export class ScoreBoard {
    constructor(game, players) {
        this.game = game;
        this.players = players;
        this.initResources();
    }

    initResources() {
        this.resources = {};

        this.resources.firstPlayerScore = this.game.add.text(10, 10, this.players[0].toString(), {
            font: 'georgia',
            fontSize: '20px',
            fill: '#000',
            align: 'left',
            fontStyle: "bold"
        });


        this.resources.secondPlayerScore = this.game.add.text(310, 10, this.players[1].toString(), {
            font: 'georgia',
            fontSize: '20px',
            fill: '#000',
            align: 'left',
            fontStyle: "bold"
        });
    }


    updateResult() {
        this.resources.firstPlayerScore.text = this.players[0].toString();
        this.resources.secondPlayerScore.text = this.players[1].toString();
    }

}