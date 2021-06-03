var config = {
    type: Phaser.AUTO,
    parent: 'pet',
    width: 59.108,
    height: 54.55,
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.spritesheet('pet1', '../../views/pet1.svg',{frameWidth:59.108,frameHeight:54.55})
}

function create ()
{
    this.player = this.add.sprite(29.554,27.275,'pet1')
    this.player.scaleX = 6
    this.player.scaleY = 6
    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('pet1',{start:0 , end: 3}),
        frameRate: 10,
        repeat: -1
    })
    this.player.anims.play('idle',true)
}
