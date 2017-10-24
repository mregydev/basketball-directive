export class goalCalculatorService{
       
    isGoalScored(ball, collisionGroup,collideCallBack) {
        let isCollide = false;
        let isturnEnd = false;
        let isGoalScored = false;
        let hasReachedHoop = false;

        let [x, y] = [ball.x, ball.y];

        if (ball && ball.velocity.y > 0) {
            ball.collides([collisionGroup], (isCollide) => collideCallBack());
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
        return new Promise((resolve,reject)=>resolve({isturnEnd,isGoalScored,hasReachedHoop}));
    }
}