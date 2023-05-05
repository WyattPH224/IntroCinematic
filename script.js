const gameWidth = 1400;
const gameHeight = 700; 
class Intro extends Phaser.Scene {
    constructor() {
        super({key: 'Logo'});
    }
    preload(){
        this.load.image("logo", "assets/logo.jpg");
        this.load.audio("meow", "assets/meow.mp3");
        }
    create(){
        const logo = this.add.sprite(gameWidth/2, gameHeight/2, "logo");
        const meowSound = this.sound.add("meow");
        this.add.text(gameWidth/2 - 210, gameHeight/8, "Cat at the Door Productions", {fontFamily: "comic sans MS", fontSize: "32px"});


        
        this.cameras.main.once('camerafadeincomplete', function (camera) {

            meowSound.play();
            camera.fadeOut(6000);
        });

        this.cameras.main.fadeIn(4000);



        this.cameras.main.once('camerafadeoutcomplete', function (event)         //on click, do this
        {

            console.log('From SceneA to SceneB');               //log to console

            this.scene.start('Transition');                         //move to Transition

        }, this);

        this.input.once('pointerdown', function (event)
        {
            console.log('From SceneB to SceneC');

            this.scene.start('Transition');

        },this);


    }
    update(){}
}

class Transition extends Phaser.Scene {
    constructor() {
        super({key: 'Transition'});
    }
    preload(){
        this.load.image("ship", "assets/spaceship.png");
    }
    create(){

        const ship = this.add.sprite(-100, gameHeight/2, "ship");

        //meteors
        this.add.circle(gameWidth/10, gameHeight/10, 10, 0x964B00);
        this.add.circle(gameWidth/10 * 4, gameHeight/10 * 7, 30, 0x964B00);
        this.add.circle(gameWidth/10 * 7, gameHeight/10 * 4, 60, 0x964B00);
        this.add.circle(gameWidth/10 * 9, gameHeight/10 * 3, 10, 0x964B00);
        this.add.circle(gameWidth/10 * 2, gameHeight/10 * 5, 20, 0x964B00);

        this.tweens.add({
            targets: ship,
            x: gameWidth + 200,
            duration: 2000,
            repeat: 0,
            ease: 'cubic.in'
        });


        this.cameras.main.fadeIn(1000);


        this.input.once('pointerdown', function (event)
        {
            console.log('From SceneB to SceneC');

            this.scene.start('Menu');

        },this);

    }
    update(){}
}

class Menu extends Phaser.Scene {
    constructor() {
        super({key: 'Menu'});
    }
    preload(){
        this.load.image("gameLogo", "assets/spaceGame.png");
        this.load.audio("music", "assets/guitarMusic.mp3");
    }
    create(){
        this.add.sprite(gameWidth/2, gameHeight/2, "gameLogo");
        const music = this.sound.add("music");
        music.play();
        this.add.circle(gameWidth/10, gameHeight/10, 10, 0x964B00);
        this.add.circle(gameWidth/10 * 9, gameHeight/10 * 7, 30, 0x964B00);

        this.add.text(gameWidth/2, gameHeight/4 * 3, "START\nOPTIONS\nCREDITS", {fontFamily: "comic sans MS", fontSize: "32px"} );

    }
    update(){}
}

let config = {
    type: Phaser.WEBGL,
    width: gameWidth,
    height: gameHeight,
    backgroundColor: 0x010D0F,
    scene: [Intro, Transition, Menu],
}

let game = new Phaser.Game(config);
