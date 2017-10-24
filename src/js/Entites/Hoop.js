export class Hoop {
    constructor(game, collisionGroup) {
        this.game = game;
        this.collisionGroup = collisionGroup;

        this.initResources();

    }

    initResources() {
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
}