export class Ball {
    constructor(game, collisionGroup) {

        this.game = game;

        this.launched = false;

        this.collisionGroup = collisionGroup;

        this.canPlay = false;

        this.initResources();

        this.addHandlers();

        this.createBall(207.37091064453125, 547.0000076293945);
    }

    set x(value) {
        if (parseFloat(value.toString())) {
            this.resources.Sprit.x = value;
        }
    };


    set collideWorldBounds(value) {
        this.resources.Sprit.body.collideWorldBounds = value;
    }

    set y(value) {
        if (parseFloat(value.toString())) {
            this.resources.Sprit.y = value;
        }
    }
    get velocity() {
        return this.resources.Sprit.body.velocity;
    }
    get x() {
        return this.resources.Sprit.x;
    }


    get y() {
        return this.resources.Sprit.y;
    }

    collides(collisionGroup, callBack) {
        return this.resources.Sprit.body.collides(collisionGroup, callBack);
    }

    addHandlers() {
        this.game.input.onDown.add(this.click, this);
        this.game.input.onUp.add(this.release, this);
    }

    initResources() {

        this.resources = {};

        //loading rouseces

        this.resources.whoosh = this.game.add.audio('whoosh');

        this.resources.spawn = this.game.add.audio('spawn');

    }

    update() {
        return new Promise((resolve, reject) => resolve({ x: this.resources.Sprit.body.x, y: this.resources.Sprit.body.y }));
    }

    kill()
    {
        
        if (this.resources.Sprit) {
            this.resources.Sprit.kill();
        }
    }
    createBall(x, y) {
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

    click(pointer) {
        if (this.canPlay) {
            let bodies = this.game.physics.p2.hitTest(pointer.position, [this.resources.Sprit.body]);
            if (bodies.length) {
                let base = this;
                this.start_location = [pointer.x, pointer.y];
                this.isDown = true;
                this.location_interval = setInterval(function () {
                    base.start_location = [pointer.x, pointer.y];
                }.bind(this), 200);
            }
        }
    }

    release(pointer) {
        if (this.isDown) {
            window.clearInterval(this.location_interval);
            this.isDown = false;
            this.end_location = [pointer.x, pointer.y];

            if (this.end_location[1] < this.start_location[1]) {
                let slope = [this.end_location[0] - this.start_location[0], this.end_location[1] - this.start_location[1]];
                let x_traj = -2300 * slope[0] / slope[1];
                this.launch(x_traj);
            }
        }
    }


    launch(x_traj) {
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
}