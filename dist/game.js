var basketball =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Ball = __webpack_require__(1);

var _Player = __webpack_require__(2);

var _Court = __webpack_require__(3);

var _Hoop = __webpack_require__(4);

var _ScoreBoard = __webpack_require__(5);

var _goalCalculatorService = __webpack_require__(6);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MainController = function () {
    function MainController($scope, goalCalculatorService) {
        _classCallCheck(this, MainController);

        this.game = new Phaser.Game(400, 625, Phaser.CANVAS, '', this);
        this.scope = $scope;
        this.goalCalculatorService = goalCalculatorService;
        this.isturnEnd = false;

        if (this.scope.players && this.scope.players.length >= 2) {
            var value = this.scope.players;
            this.players = [new _Player.Player(value[0].name, value[0].isMainPlayer), new _Player.Player(value[1].name, value[1].isMainPlayer)];
        }

        $scope.position = { x: 222, y: 333 };
        //$scope.position.x=222;
    }

    _createClass(MainController, [{
        key: 'preload',
        value: function preload() {

            this.game.load.audio('score', this.scope.baseurl + '/file/score.wav');
            this.game.load.audio('backboard', this.scope.baseurl + '/file/backboard.wav');
            this.game.load.audio('whoosh', this.scope.baseurl + '/file/whoosh.wav');
            this.game.load.audio('fail', this.scope.baseurl + '/file/fail.wav');
            this.game.load.audio('spawn', this.scope.baseurl + '/file/spawn.wav');

            this.game.load.image('court', this.scope.baseurl + '/file/court.png');
            this.game.load.image('ball', this.scope.baseurl + '/file/ball.png');
            this.game.load.image('hoop', this.scope.baseurl + '/file/hoop.png');
        }
    }, {
        key: 'initGamephysics',
        value: function initGamephysics() {
            this.game.physics.startSystem(Phaser.Physics.P2JS);
            this.game.physics.p2.setImpactEvents(true);
            this.game.physics.p2.restitution = 0.63;
            this.game.physics.p2.gravity.y = 0;

            this.collisionGroup = this.game.physics.p2.createCollisionGroup();
        }
    }, {
        key: 'initResources',
        value: function initResources() {
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
    }, {
        key: 'initScoreBoard',
        value: function initScoreBoard(value) {

            this.ScoreBoard = new _ScoreBoard.ScoreBoard(this.game, this.players);
        }
    }, {
        key: 'initScopeWatchers',
        value: function initScopeWatchers() {
            var _this = this;

            this.scope.$watch("players", function (value) {
                if (value.length > 2) {
                    _this.players = [new _Player.Player(value[0].name, value[0].isMainPlayer), new _Player.Player(value[1].name, value[1].isMainPlayer)];
                    _this.initScoreBoard();
                }
            }, true);

            this.scope.$watch("canPlay", function (value) {
                _this.ball.canPlay = value;
            });

            this.scope.$watch("position", function (args) {
                if (!_this.players[_this.scope.cuurentturn].IsMainPlayer && args && args.x && args.y) {
                    _this.ball.x = args.x;
                    _this.ball.y = args.y;
                    _this.update();
                }
            }, true);

            this.scope.$watch("position", function (args) {
                //console.log("position changed");
            }, true);

            this.scope.$on("killGame", function (event, args) {
                _this.game.kill();
                console.log("game killed");
            });

            this.scope.$on("createBall", function (event, args) {
                _this.isturnEnd = false;

                _this.ball.createBall(args.x, args.y);
            });

            this.scope.$on("updateposition", function (event, args) {
                console.log('updating position ' + args.x + ' , ' + args.y + ' ,' + args.vy);

                if (!_this.scope.canPlay && args && args.x && args.y) {
                    var _ref = [args.x, args.y, args.vy];
                    _this.ball.x = _ref[0];
                    _this.ball.y = _ref[1];
                    _this.ball.velocity.y = _ref[2];


                    _this.update();
                }
            });
        }
    }, {
        key: 'create',
        value: function create() {
            this.initGamephysics();
            this.initResources();

            this.court = new _Court.Court(this.game);
            this.hoop = new _Hoop.Hoop(this.game, this.collisionGroup);
            this.ball = new _Ball.Ball(this.game, this.collisionGroup);
            this.ball.canPlay = this.scope.canPlay;

            //console.log("current turn is " + this.scope.cuurentturn);
            this.initScopeWatchers();
            this.initScoreBoard();
        }
    }, {
        key: 'update',
        value: function update() {
            var _this2 = this;

            if (this.isturnEnd) {
                return;
            }

            this.ball.update().then(function (coords) {

                if (_this2.scope.canPlay) {
                    _this2.scope.$emit("sendCoordinates", { x: _this2.ball.x, y: _this2.ball.y, vy: _this2.ball.velocity.y });
                }

                _this2.goalCalculatorService.isGoalScored(_this2.ball, _this2.collisionGroup, function () {
                    return _this2.resources["backboard"].play();
                }).then(function (result) {

                    if (result.hasReachedHoop && result.isGoalScored) {
                        console.log("goal scoered");
                        _this2.resources["score"].play();
                        _this2.players[_this2.scope.turnindex].Score++;
                        _this2.ScoreBoard.updateResult();
                    }

                    if (result.hasReachedHoop && !result.isGoalScored) {
                        _this2.resources["fail"].play();
                    }

                    if (result.isturnEnd) {
                        _this2.game.physics.p2.gravity.y = 0;

                        _this2.ball.kill();

                        _this2.isturnEnd = true;

                        _this2.scope.$emit("turnend", []);

                        console.log("turn is ended");
                    }
                });
            });
        }
    }]);

    return MainController;
}();

angular.module("basketmodule", []).directive("basketBall", function () {
    return {
        controller: 'MainController',
        scope: {
            "players": "=",
            "canPlay": "=",
            "position": "=",
            "baseurl": "=",
            "turnindex": "="

        }
    };
}).controller('MainController', MainController).service("goalCalculatorService", _goalCalculatorService.goalCalculatorService);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ball = exports.Ball = function () {
    function Ball(game, collisionGroup) {
        _classCallCheck(this, Ball);

        this.game = game;

        this.launched = false;

        this.collisionGroup = collisionGroup;

        this.canPlay = false;

        this.initResources();

        this.addHandlers();

        this.createBall(207.37091064453125, 547.0000076293945);
    }

    _createClass(Ball, [{
        key: 'collides',
        value: function collides(collisionGroup, callBack) {
            return this.resources.Sprit.body.collides(collisionGroup, callBack);
        }
    }, {
        key: 'addHandlers',
        value: function addHandlers() {
            this.game.input.onDown.add(this.click, this);
            this.game.input.onUp.add(this.release, this);
        }
    }, {
        key: 'initResources',
        value: function initResources() {

            this.resources = {};

            //loading rouseces

            this.resources.whoosh = this.game.add.audio('whoosh');

            this.resources.spawn = this.game.add.audio('spawn');
        }
    }, {
        key: 'update',
        value: function update() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                return resolve({ x: _this.resources.Sprit.body.x, y: _this.resources.Sprit.body.y });
            });
        }
    }, {
        key: 'kill',
        value: function kill() {

            if (this.resources.Sprit) {
                this.resources.Sprit.kill();
            }
        }
    }, {
        key: 'createBall',
        value: function createBall(x, y) {
            this.resources.spawn.play();

            if (this.resources.Sprit) {
                this.resources.Sprit.kill();
            }

            this.resources.Sprit = this.game.add.sprite(x, y, 'ball');

            this.resources.Sprit.height = this.resources.Sprit.width = 80;

            this.game.add.tween(this.resources.Sprit.scale).from({
                x: 0.7,
                y: 0.7
            }, 100, Phaser.Easing.Linear.None, true, 0, 0, false);

            this.game.physics.p2.enable(this.resources.Sprit, false);

            this.resources.Sprit.body.setCircle(60);

            this.launched = false;

            this.isBelowHoop = false;
        }
    }, {
        key: 'click',
        value: function click(pointer) {
            if (this.canPlay) {
                var bodies = this.game.physics.p2.hitTest(pointer.position, [this.resources.Sprit.body]);
                if (bodies.length) {
                    var base = this;
                    this.start_location = [pointer.x, pointer.y];
                    this.isDown = true;
                    this.location_interval = setInterval(function () {
                        base.start_location = [pointer.x, pointer.y];
                    }.bind(this), 200);
                }
            }
        }
    }, {
        key: 'release',
        value: function release(pointer) {
            if (this.isDown) {
                window.clearInterval(this.location_interval);
                this.isDown = false;
                this.end_location = [pointer.x, pointer.y];

                if (this.end_location[1] < this.start_location[1]) {
                    var slope = [this.end_location[0] - this.start_location[0], this.end_location[1] - this.start_location[1]];
                    var x_traj = -2300 * slope[0] / slope[1];
                    this.launch(x_traj);
                }
            }
        }
    }, {
        key: 'launch',
        value: function launch(x_traj) {
            if (!this.launched) {
                this.resources.Sprit.body.setCircle(36);
                this.resources.Sprit.body.setCollisionGroup(this.collisionGroup);
                this.launched = true;
                this.game.physics.p2.gravity.y = 3000;
                this.game.add.tween(this.resources.Sprit.scale).to({
                    x: 0.6,
                    y: 0.6
                }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
                this.resources.Sprit.body.velocity.x = x_traj;
                this.resources.Sprit.body.velocity.y = -1750;
                this.resources.Sprit.body.rotateRight(x_traj / 3);
                this.resources.whoosh.play();
            }
        }
    }, {
        key: 'x',
        set: function set(value) {
            if (parseFloat(value.toString())) {
                this.resources.Sprit.x = value;
            }
        },
        get: function get() {
            return this.resources.Sprit.x;
        }
    }, {
        key: 'collideWorldBounds',
        set: function set(value) {
            this.resources.Sprit.body.collideWorldBounds = value;
        }
    }, {
        key: 'y',
        set: function set(value) {
            if (parseFloat(value.toString())) {
                this.resources.Sprit.y = value;
            }
        },
        get: function get() {
            return this.resources.Sprit.y;
        }
    }, {
        key: 'velocity',
        get: function get() {
            return this.resources.Sprit.body.velocity;
        }
    }]);

    return Ball;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = exports.Player = function () {
    function Player(name, isMainPlayer) {
        _classCallCheck(this, Player);

        this.Name = name.substring(0, 5);
        this.Score = 0;
        this.NumberOfBallsToThrow = 5;
        this.IsMainPlayer = isMainPlayer;
    }

    _createClass(Player, [{
        key: "toString",
        value: function toString() {
            return this.Name + "  " + (this.Score >= 1000 ? parseInt(this.Score / 1000) + "+" : this.Score);
        }
    }]);

    return Player;
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Court = exports.Court = function Court(game) {
    _classCallCheck(this, Court);

    game.stage.background = game.add.tileSprite(0, 0, game.width, game.height, 'court');
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Hoop = exports.Hoop = function () {
    function Hoop(game, collisionGroup) {
        _classCallCheck(this, Hoop);

        this.game = game;
        this.collisionGroup = collisionGroup;

        this.initResources();
    }

    _createClass(Hoop, [{
        key: 'initResources',
        value: function initResources() {
            this.resources = {};
            this.resources.hoop = this.game.add.sprite(70, 72, 'hoop'); // 141, 100
            this.resources.hoop.width = 257;
            this.resources.hoop.height = 154;

            this.resources.left_rim = this.game.add.sprite(150, 184, ''); // 241, 296
            this.resources.right_rim = this.game.add.sprite(249, 184, ''); // 398, 296

            this.game.physics.p2.enable([this.resources.left_rim, this.resources.right_rim], false);

            this.resources.left_rim.body.setCircle(2.5);
            this.resources.left_rim.body.static = true;
            this.resources.left_rim.body.setCollisionGroup(this.collisionGroup);
            this.resources.left_rim.body.collides([this.collisionGroup]);

            this.resources.right_rim.body.setCircle(2.5);
            this.resources.right_rim.body.static = true;
            this.resources.right_rim.body.setCollisionGroup(this.collisionGroup);
            this.resources.right_rim.body.collides([this.collisionGroup]);
        }
    }]);

    return Hoop;
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScoreBoard = exports.ScoreBoard = function () {
    function ScoreBoard(game, players) {
        _classCallCheck(this, ScoreBoard);

        this.game = game;
        this.players = players;
        this.initResources();
    }

    _createClass(ScoreBoard, [{
        key: 'initResources',
        value: function initResources() {
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
    }, {
        key: 'updateResult',
        value: function updateResult() {
            this.resources.firstPlayerScore.text = this.players[0].toString();
            this.resources.secondPlayerScore.text = this.players[1].toString();
        }
    }]);

    return ScoreBoard;
}();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var goalCalculatorService = exports.goalCalculatorService = function () {
    function goalCalculatorService() {
        _classCallCheck(this, goalCalculatorService);
    }

    _createClass(goalCalculatorService, [{
        key: "isGoalScored",
        value: function isGoalScored(ball, collisionGroup, collideCallBack) {
            var isCollide = false;
            var isturnEnd = false;
            var isGoalScored = false;
            var hasReachedHoop = false;

            var _ref = [ball.x, ball.y],
                x = _ref[0],
                y = _ref[1];


            if (ball && ball.velocity.y > 0) {
                ball.collides([collisionGroup], function (isCollide) {
                    return collideCallBack();
                });
            }

            if (ball && ball.velocity.y > 0 && y > 188 && !ball.isBelowHoop) {
                hasReachedHoop = true;
                ball.isBelowHoop = true;
                ball.collideWorldBounds = true;
                if (x > 151 && x < 249) {
                    isGoalScored = true;
                }
            }

            if (y > 1200) {
                isturnEnd = true;
            }
            return new Promise(function (resolve, reject) {
                return resolve({ isturnEnd: isturnEnd, isGoalScored: isGoalScored, hasReachedHoop: hasReachedHoop });
            });
        }
    }]);

    return goalCalculatorService;
}();

/***/ })
/******/ ]);
//# sourceMappingURL=game.js.map