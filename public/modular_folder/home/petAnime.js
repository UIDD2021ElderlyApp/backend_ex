var config = {
    type: Phaser.AUTO,
    parent: 'pet',
    width: 210,
    height: 200,
    transparent: true,
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.spritesheet('pet1', '../modular_folder/home/pet1.png',{frameWidth:209.5,frameHeight:193})
}

function create ()
{
    this.player = this.add.sprite(105,100,'pet1')
    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('pet1',{start:0 , end: 3}),
        frameRate: 5,
        repeat: -1
    })
    this.player.anims.play('idle',true)
}
