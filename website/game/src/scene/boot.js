//import gameData from "../../../userData/json/U3d5ed62dc56e57382acad4d9254111e1CatchFood.json";
//import background from '../../../userData/img/background.png';
//import startBtn from '../../../userData/img/start_btn.png';

//const userPath = sessionStorage.getItem("userPath");
const userPath = "jyT2CIqmRAW6zGmo";
const background = require(`../../userData/${userPath}/background.png`);
const startBtn = require(`../../userData/${userPath}/start_btn.png`);
const gameData = require(`../../userData/${userPath}/userData.json`);



class Boot extends Phaser.Scene{
    constructor() {
        super('Boot');
    }

    preload() {
        this.load.json("gameData", gameData);
        this.load.image("background", background);
        this.load.image("startBtn", startBtn);
    }

    create() {
        
        let gameWidth = this.sys.game.config.width;
        let gameHeight = this.sys.game.config.height;
        

        let bg = this.add.image(0, 0, "background").setOrigin(0,0);
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