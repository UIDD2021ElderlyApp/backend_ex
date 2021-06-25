var width = window.innerWidth*window.devicePixelRatio
var config = {
    type: Phaser.AUTO,
    parent: 'animal',
    width: Math.round(width * 0.7),
    height: Math.round(width * 0.63),
    roundPixels: true,
    transparent: true,
    scene: {
        preload: preload,
        create: create
    }
};
var animal = parseInt((document.getElementById('jade_user_info_choosedanimal')) ? document.getElementById('jade_user_info_choosedanimal').innerText : "0", 10);
var game = new Phaser.Game(config);

function preload() {
    switch (animal) {
        case 1:
            this.load.spritesheet('pet', './frontend/biggggg/image/pet1.svg', { frameWidth: 224, frameHeight: 193 })
            break
        case 2:
            this.load.spritesheet('pet', './frontend/biggggg/image/pet2.svg', { frameWidth: 224, frameHeight: 193 })
            break
        case 3:
            this.load.spritesheet('pet', './frontend/biggggg/image/pet3.svg', { frameWidth: 224, frameHeight: 193 })
            break
        default:
            console.log("???")
    }
}

function create() {
    console.log("+_++_+_+_++"+window.devicePixelRatio)
    this.player = this.add.sprite(Math.round(width * 0.35), Math.round(width * 0.32), 'pet') // image center vs canvas
    this.player.scaleX = width * 0.0038
    this.player.scaleY = width * 0.0038
    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('pet', { start: 0, end: 3 }),
        frameRate: 5,
        repeat: -1
    })
    this.player.anims.play('idle', true)
}