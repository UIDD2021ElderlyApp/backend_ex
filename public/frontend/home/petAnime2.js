var config = {
    type: Phaser.AUTO,
    parent: 'pet2',
    width: 630,
    height: 600,
    transparent: true,
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.spritesheet('pet2', '../modular_folder/home/pet2.png',{frameWidth:209.5,frameHeight:193})
}

function create ()
{
    var pet = 'pet2'
    this.player = this.add.sprite(305,300,pet)
    this.player.scaleX = 3
    this.player.scaleY = 3
    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers(pet,{start:0 , end: 3}),
        frameRate: 5,
        repeat: -1
    })
    this.player.anims.play('idle',true)
}
