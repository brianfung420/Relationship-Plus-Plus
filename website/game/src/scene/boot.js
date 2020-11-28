
import blankBackground from '../static/assert/blankBackground.png';
import startBtn from '../static/assert/start_btn.png';

const userPath = sessionStorage.getItem("userPath");
const gameData = require(`../../userData/${userPath}/userData.json`);


class Boot extends Phaser.Scene{
    constructor() {
        super('Boot');
    }

    preload() {
        this.load.json("gameData", gameData);
        this.load.image("blankBackground", blankBackground);
        this.load.image("startBtn", startBtn);
    }

    create() {
        
        let gameWidth = this.sys.game.config.width;
        let gameHeight = this.sys.game.config.height;
        

        let bg = this.add.image(0, 0, "blankBackground").setOrigin(0,0);
        let style = {
            font: "48px Monospace",
            fill: "#000000",
            align: "center"
          };

        this.add.text(gameWidth/2, gameHeight/2-100, '接東西遊戲', style).setOrigin(0.5, 0.5);

        //bg.displayHeight = this.sys.game.config.height;
        //bg.scaleX = bg.scaleY;

        //bg.y = game.config.height/2;
        //bg.x = game.config.width/2;

        var startBtn = this.add.image(gameWidth/2, gameHeight/2+100, 'startBtn').setOrigin(0.5, 0.5);
        startBtn.setInteractive();
        startBtn.on('pointerdown', this.startGame.bind(this));

        
        //let data = this.game.cache.getJSON('gameData');
        //console.log(data.opening[0]);

    }
    startGame() {
        this.scene.start("SceneMain");
    }
    update() {
       
    }
}

export default Boot;