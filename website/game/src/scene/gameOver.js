//const userPath = sessionStorage.getItem("userPath");
//const userPath = "jyT2CIqmRAW6zGmo";
import background from '../static/assert/background.png';
class GameOver extends Phaser.Scene{
    constructor(){
        super('GameOver');

    }
    init(data) {
        this.score = data.score;
    }

    preload() {
        this.load.image("background", background);
        
    }

    create() {
        this.add.image(0, 0, 'background').setOrigin(0, 0);

        let gameWidth = this.sys.game.config.width;
        let gameHeight = this.sys.game.config.height;

        var style = {
            font: '32px Monospace',
            fill: '#000000',
            align: 'center'
        }
        var style2 = {
            font: '64px Monospace',
            fill: '#ff0000',
            align: 'center'
        }
        let data = this.cache.json.get('gameData');
        let feedback;
       
        
        if (this.score < parseInt(data.FinalFeedback.belowThen.point)){
            feedback = data.FinalFeedback.belowThen.feedback;
          }else if(this.score > parseInt(data.FinalFeedback.higherThen.point)){
            feedback = data.FinalFeedback.higherThen.feedback;
          }else{
            feedback = data.FinalFeedback.other.feedback;
        }
        
        
        var text = this.add.text(gameWidth/2, gameHeight/2 -100,
        '遊戲結束\n\n你的分數：' + this.score , style).setOrigin(0.5, 0.5);
    
        var feedbackText = this.add.text(gameWidth/2, 350, feedback,style2).setOrigin(0.5, 0.5); 

       
        //this.input.onDown.add(this.restartGame, this);
        this.input.on('pointerdown', this.restartGame.bind(this))
        
    }
    restartGame() {
        this.scene.start('Boot');
    }

}

export default GameOver;
