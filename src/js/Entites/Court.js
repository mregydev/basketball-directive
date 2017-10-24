export class Court
{
    constructor(game)
    {
        game.stage.background = game.add.tileSprite(0, 0, game.width, game.height,'court');
    }
}