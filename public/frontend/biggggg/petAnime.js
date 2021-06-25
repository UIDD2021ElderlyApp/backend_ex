var width = $(window).width()
var config = {
    type: Phaser.AUTO,
    parent: 'animal',
    width: width * 0.7,
    height: width * 0.63,
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
            this.load.spritesheet('pet', './frontend/biggggg/image/pet1.png', { frameWidth: 210, frameHeight: 193 })
            break
        case 2:
            this.load.spritesheet('pet', './frontend/biggggg/image/pet2.png', { frameWidth: 210, frameHeight: 193 })
            break
        case 3:
            this.load.spritesheet('pet', './frontend/biggggg/image/pet3.png', { frameWidth: 210, frameHeight: 193 })
            break
        default:
            console.log("???")
    }
}

function create() {
    game.renderer.renderSession.roundPixels = true
    var pet = 'pet'
    this.player = this.add.sprite(width * 0.33, width * 0.32, pet) // image center vs canvas
    this.player.scaleX = width * 0.0038
    this.player.scaleY = width * 0.0038
    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers(pet, { start: 0, end: 3 }),
        frameRate: 5,
        repeat: -1
    })
    this.player.anims.play('idle', true)
}