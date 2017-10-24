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


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MainController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.testMessage = testMessage;

var _Ball = __webpack_require__(1);

var _Player = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MainController = exports.MainController = function () {
    function MainController() {
        _classCallCheck(this, MainController);

        this.game = new Phaser.Game(400, 625, Phaser.CANVAS, '', {
            preload: this.preload,
            create: this.create,
            update: this.update
        });

        this.ball = new _Ball.Ball();
        this.players = [];
    }

    _createClass(MainController, [{
        key: 'AddPlayer',
        value: function AddPlayer(player) {
            if (player) {
                this.players.push(player);
            }
        }
    }, {
        key: 'preload',
        value: function preload() {
            game.load.audio('score', 'assets/audio/score.wav');
            game.load.audio('backboard', 'assets/audio/backboard.wav');
            game.load.audio('whoosh', 'assets/audio/whoosh.wav');
            game.load.audio('fail', 'assets/audio/fail.wav');
            game.load.audio('spawn', 'assets/audio/spawn.wav');
        }
    }, {
        key: 'create',
        value: function create() {
            game.physics.startSystem(Phaser.Physics.P2JS);
            game.physics.p2.setImpactEvents(true);

            game.physics.p2.restitution = 0.63;
            game.physics.p2.gravity.y = 0;

            collisionGroup = game.physics.p2.createCollisionGroup();

            score_sound = game.add.audio('score');
            backboard = game.add.audio('backboard');
            backboard.volume = 0.5;
            whoosh = game.add.audio('whoosh');
            fail = game.add.audio('fail');
            fail.volume = 0.1;
            spawn = game.add.audio('spawn');

            game.stage.background = game.add.tileSprite(0, 0, game.width, game.height, 'court');
        }
    }, {
        key: 'update',
        value: function update() {}
    }]);

    return MainController;
}();

function testMessage() {
    alert("this is a message");
}

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

        //loading rouseces
        game.load.image('ball', 'assets/images/this.Sprit.png');

        game.load.audio('whoosh', 'assets/audio/whoosh.wav');

        game.load.audio('spawn', 'assets/audio/spawn.wav');

        //Setting class Members
        this.Sprit = game.add.sprite(0, 0, 'ball');

        this.game = game;

        this.launched = false;

        this.whoosh = game.add.audio('whoosh');

        this.spawn = game.add.audio('spawn');

        this.collisionGroup = collisionGroup;

        game.input.onDown.add(click, this);
    }

    _createClass(Ball, [{
        key: 'update',
        value: function update() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                return resolve({ x: _this.Sprit.x, y: _this.Sprit.y });
            });
        }
    }, {
        key: 'createBall',
        value: function createBall(x, y) {
            this.spawn.play();

            this.Sprit = game.add.sprite(x, y, 'ball');

            this.Sprit.height = this.Sprit.width = 80;

            game.add.tween(this.Sprit.scale).from({
                x: 0.7,
                y: 0.7
            }, 100, Phaser.Easing.Linear.None, true, 0, 0, false);

            game.physics.p2.enable(this.Sprit, false);

            this.Sprit.body.setCircle(60);

            this.launched = false;

            this.isBelowHoop = false;
        }
    }, {
        key: 'click',
        value: function click(pointer) {
            var bodies = game.physics.p2.hitTest(pointer.position, [this.Sprit.body]);
            if (bodies.length) {

                var base = this;

                this.start_location = [pointer.x, pointer.y];
                this.isDown = true;
                this.location_interval = setInterval(function () {
                    base.start_location = [pointer.x, pointer.y];
                }.bind(this), 200);
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
                this.Sprit.body.setCircle(36);
                this.Sprit.body.setCollisionGroup(this.collisionGroup);
                this.launched = true;
                game.physics.p2.gravity.y = 3000;
                game.add.tween(this.Sprit.scale).to({
                    x: 0.6,
                    y: 0.6
                }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
                this.Sprit.body.velocity.x = x_traj;
                this.Sprit.body.velocity.y = -1750;
                this.Sprit.body.rotateRight(x_traj / 3);
                this.whoosh.play();
            }
        }
    }, {
        key: 'X',
        set: function set(value) {
            if (parseFloat(value.toString())) {
                this.Sprit.x = value;
            }
        },
        get: function get() {
            return this.Sprit.x;
        }
    }, {
        key: 'Y',
        set: function set(value) {
            if (parseFloat(value.toString())) {
                this.Sprit.y = value;
            }
        },
        get: function get() {
            return this.Sprit.y;
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = exports.Player = function Player() {
    _classCallCheck(this, Player);

    this.Name = "";
    this.Score = 0;
    this.NumberOfBallsToThrow = 5;
    this.IsMainPlayer = false;
};

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map