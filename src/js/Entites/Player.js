export class Player
{
    constructor(name,isMainPlayer)
    {
        this.Name=name.substring(0,5);
        this.Score=0;
        this.NumberOfBallsToThrow=5;
        this.IsMainPlayer=isMainPlayer;
    }

    toString()
    {
        return this.Name+"  "+(this.Score>=1000?`${parseInt(this.Score/1000)}+`:this.Score);
    }
}