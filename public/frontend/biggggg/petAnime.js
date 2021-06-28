// var width = window.innerWidth
// var config = {
//     type: Phaser.AUTO,
//     parent: 'animal',
//     width: Math.round(width * 0.7),
//     height: Math.round(width * 0.63),
//     roundPixels: true,
//     transparent: true,
//     scene: {
//         preload: preload,
//         create: create,
//         update: update
//     }
// };
// var animal = parseInt((document.getElementById('jade_user_info_choosedanimal')) ? document.getElementById('jade_user_info_choosedanimal').innerText : "0", 10);
// var game = new Phaser.Game(config);

// function preload() {
//     switch (animal) {
//         case 1:
//             this.load.spritesheet('pet', './frontend/biggggg/image/pet1.png', { frameWidth: 209.5, frameHeight: 193 })
//             break
//         case 2:
//             this.load.spritesheet('pet', './frontend/biggggg/image/pet2.png', { frameWidth: 209.5, frameHeight: 193 })
//             break
//         case 3:
//             this.load.spritesheet('pet', './frontend/biggggg/image/pet3.png', { frameWidth: 209.5, frameHeight: 193 })
//             break
//         default:
//             console.log("???")
//     }
// }

// function create() {
//     this.player = this.add.sprite(Math.round(width * 0.35), Math.round(width * 0.32), 'pet') // image center vs canvas
//     this.player.scaleX = width * 0.0038
//     this.player.scaleY = width * 0.0038
//     this.anims.create({
//         key: 'idle',
//         frames: this.anims.generateFrameNumbers('pet', { start: 0, end: 3 }),
//         frameRate: 5,
//         repeat: -1
//     })
//     this.player.anims.play('idle', true)
// }

// function update() {
//     //canvas size
//     game.scale.resize($(window).width() * 0.7, $(window).width() * 0.6);
//     //sprite position
//     this.player.setPosition($(window).width() * 0.33, $(window).width() * 0.32)
//     this.player.scaleX = $(window).width() * 0.0038
//     this.player.scaleY = $(window).width() * 0.0038
// }
var animalc = parseInt((document.getElementById('jade_user_info_choosedanimal')) ? document.getElementById('jade_user_info_choosedanimal').innerText : "0", 10);
document.getElementById("animal").style.backgroundImage = "url(\"./frontend/biggggg/image/pet" + animalc +".svg\")";
var position = window.innerWidth* 0.0038* 209.5
var animeTimer = setInterval(()=>{
    document.getElementById("animal").style.backgroundPosition = `-${position}px 0px`; 
    if(position < window.innerWidth* 0.0038* 209.5* 4)
    {
        position += window.innerWidth* 0.0038* 209.5;
    }
    else
    {
        position = window.innerWidth* 0.0038* 209.5;
    }
},200)