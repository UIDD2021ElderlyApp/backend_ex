var app = new PIXI.Application(800, 800, {backgroundColor : 0xFFD700});
document.getElementById("ThisIsAIdForYouToAppend").appendChild(app.view);
var container = new PIXI.Container();

app.stage.addChild(container);

// create a new Sprite from an image path
var bunny = PIXI.Sprite.fromImage('bear.png')
var bunny2 = PIXI.Sprite.fromImage('bunny.png')

// center the sprite's anchor point
bunny.anchor.set(0.1);

// move the sprite to the center of the screen
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;

container.addChild(bunny);
container.addChild(bunny2);
bunny.x = app.screen.width / 2;

container.x = (app.screen.width - container.width) / 3;
container.y = (app.screen.height - container.height) / 3;

// Listen for animate update

app.ticker.add(function(delta) {
    // just for fun, let's rotate mr rabbit a little
    // delta is 1 if running at 100% performance
    // creates frame-independent transformation
    bunny2.rotation += 0.5 * delta;
    bunny2 = PIXI.Sprite.fromImage('bear.png')
    //bunny2 = PIXI.Sprite.fromImage('bunny.png')
});