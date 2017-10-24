import { Ball } from './Entites/Ball'
import { Player } from './Entites/Player'
import { Court } from './Entites/Court'
import { Hoop } from './Entites/Hoop'
import { ScoreBoard } from './Entites/ScoreBoard'
import { goalCalculatorService } from './Services/goalCalculatorService'

class MainController {
    constructor($scope, goalCalculatorService) {
        this.game = new Phaser.Game(400, 625, Phaser.CANVAS, '', this);
        this.scope = $scope;
        this.goalCalculatorService = goalCalculatorService;
        this.isturnEnd = false;

        if (this.scope.players && this.scope.players.length >= 2) {
            let value = this.scope.players;
            this.players = [new Player(value[0].name, value[0].isMainPlayer), new Player(value[1].name, value[1].isMainPlayer)];
        }


        $scope.position = { x: 222, y: 333 };
    }


    preload() {

        this.game.load.audio('score', this.scope.baseurl+'/file/score.wav');
        this.game.load.audio('backboard', this.scope.baseurl+'/file/backboard.wav');
        this.game.load.audio('whoosh', this.scope.baseurl+'/file/whoosh.wav');
        this.game.load.audio('fail', this.scope.baseurl+'/file/fail.wav');
        this.game.load.audio('spawn', this.scope.baseurl+'/file/spawn.wav');

        this.game.load.image('court', this.scope.baseurl+'/file/court.png');
        this.game.load.image('ball', this.scope.baseurl+'/file/ball.png');
        this.game.load.image('hoop', this.scope.baseurl+'/file/hoop.png');
    }

    initGamephysics() {
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.setImpactEvents(true);
        this.game.physics.p2.restitution = 0.63;
        this.game.physics.p2.gravity.y = 0;

        this.collisionGroup = this.game.physics.p2.createCollisionGroup();
    }

    initResources() {
        this.resources = {};

        this.resources["fail"] = this.game.add.audio('fail');
        this.resources["fail"].volume = 0.1;

        this.resources["spawn"] = this.game.add.audio('spawn');
        this.resources["spawn"].volume = 0.1;

        this.resources["backboard"] = this.game.add.audio('backboard');
        //this.resources["backboard"].volume = 0.5;

        this.resources["score"] = this.game.add.audio('score');
        this.resources["score"].volume = 0.5;
    }

    initScoreBoard(value) {

        this.ScoreBoard = new ScoreBoard(this.game, this.players);

    }

    initScopeWatchers() {

        this.scope.$watch("players", (value) => {
            if (value.length > 2) {
                this.players = [new Player(value[0].name, value[0].isMainPlayer), new Player(value[1].name, value[1].isMainPlayer)];
                this.initScoreBoard();
            }
        }, true);

        this.scope.$watch("canPlay", (value) => {
            this.ball.canPlay = value;
        });


        this.scope.$watch("position", (args) => {
            if (!this.players[this.scope.cuurentturn].IsMainPlayer && args && args.x && args.y) {
                this.ball.x = args.x;
                this.ball.y = args.y;
                this.update();
            }
        }, true);


        this.scope.$watch("position", (args) => {
            //console.log("position changed");
        }, true);


        this.scope.$on("killGame",(event,args)=>
        {
            this.game.kill();
            console.log("game killed");
        });

        this.scope.$on("createBall", (event, args) => {
            this.isturnEnd = false;

            this.ball.createBall(args.x, args.y);
        });

        this.scope.$on("updateposition", (event, args) => {
            console.log(`updating position ${args.x} , ${args.y} ,${args.vy}`);

            if (!this.scope.canPlay && args && args.x && args.y) {
                [this.ball.x, this.ball.y, this.ball.velocity.y] = [args.x, args.y, args.vy];

                this.update();
            }
        });

    }

    create() {
        this.initGamephysics();
        this.initResources();

        this.court = new Court(this.game);
        this.hoop = new Hoop(this.game, this.collisionGroup);
        this.ball = new Ball(this.game, this.collisionGroup);
        this.ball.canPlay = this.scope.canPlay;


        //console.log("current turn is " + this.scope.cuurentturn);
        this.initScopeWatchers();
        this.initScoreBoard();

    }

    update() {
        if (this.isturnEnd) {
                return;
            }

        this.ball.update().then((coords) => {
            
            if (this.scope.canPlay) {
                this.scope.$emit("sendCoordinates", { x: this.ball.x, y: this.ball.y, vy: this.ball.velocity.y });
            }

            this.goalCalculatorService.isGoalScored(this.ball, this.collisionGroup, () => this.resources["backboard"].play()).then((result) => {

                if (result.hasReachedHoop && result.isGoalScored) {
                    console.log("goal scoered");
                    this.resources["score"].play();
                    this.players[this.scope.turnindex].Score++;
                    this.ScoreBoard.updateResult();
                }

                if (result.hasReachedHoop && !result.isGoalScored) {
                    this.resources["fail"].play();
                }

                if (result.isturnEnd) {
                    this.game.physics.p2.gravity.y = 0;

                    this.ball.kill();

                    this.isturnEnd = true;

                    this.scope.$emit("turnend", []);

                    console.log("turn is ended");
                }
            });

        });
    }
}

angular.module("basketmodule", []).directive("basketBall", () => {
    return {
        controller: 'MainController',
        scope: {
            "players": "=",
            "canPlay": "=",
            "position": "=",
            "baseurl":"=",
            "turnindex":"="
            
        }
    }
}).controller('MainController', MainController).service("goalCalculatorService", goalCalculatorService);

