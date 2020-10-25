//const userPath = sessionStorage.getItem("userPath");
const userPath = "U3d5ed62dc56e57382acad4d9254111e1";
const background = require(`../../../userData/${userPath}/img/background.png`);
const avatarUnhappy = require(`../../../userData/${userPath}/img/goalin_runner-1603089450711.gif`);

const food1 = require(`../../../userData/${userPath}/img/food1.png`);
const food2 = require(`../../../userData/${userPath}/img/food2.png`);
const avatar = require(`../../../userData/${userPath}/img/goal.gif`);


class SceneMain extends Phaser.Scene{
    

    constructor() {
        super('SceneMain');
        this.score = 0;
        this.scoreText = null;
        this.timeLeft = 0;
        this.timeText = null;
        this.feedbackBar = null;
    }

    preload() {
        //let path = "../../../userData/img/food2.png";
        let data = this.cache.json.get('gameData');
        this.load.image("background", background);
        this.load.image("avatar", avatar);
        this.load.image("avatarUnhappy", avatarUnhappy);
        this.load.image("arrestedObject1", food1);
        this.load.image("arrestedObject2", food2);
        /*
        for(let i = 1; i <= data.arrestedObject.length ; i++){
            let key = "arrestedObject" + i;
            let path = "../../assert/catchFood/images/" + "food"+i+".png"
            this.load.image(key, path);
        }      
        */ 
    }

    create() {
        let gameWidth = this.sys.game.config.width;
        let gameHeight = this.sys.game.config.height;
        let data = this.cache.json.get('gameData');

        
        this.score = 0;
        this.timeLeft = 10;
        //this.physics.startSystem(Phaser.Physics.ARCADE);

        this.add.image(0, 0, 'background').setOrigin(0, 0);

        this.arrestedObject = this.add.group();
        this.arrestedObject.enableBody = true;
        this.player = this.physics.add.sprite(400, 400, 'avatar');
        
        this.player.body.gravity.y = 600;
        this.player.body.collideWorldBounds = true;
        //this.player.scale.setTo(1,0.8);
        
        this.cursors = this.input.keyboard.createCursorKeys(); 

        var dropTimer = this.time.addEvent({
            delay: 1000,                // ms
            callback: this.dropObject,
            //args: [this.timeLeft],
            callbackScope: this,
            loop: true
        });

        var style = {
        font: '32px Monospace',
        fill: '#000000',
        align: 'center'
        }
        
        var timer = this.time.addEvent({
            delay: 1000,                // ms
            callback: this.decreaseTime,
            //args: [this.timeLeft],
            callbackScope: this,
            loop: true
        });
        
        this.scoreText = this.add.text(5, 5, '分數：' + this.score, style);
        this.timeText = this.add.text(gameWidth/2-100,100,
        '剩餘時間：' + this.timeLeft, style).setOrigin(0,1);
        
        //console.log(this.timeLeft)
        //this.time.addEvent(timer);
           //console.log(this.time.delayedCall(2000,this.decreaseTime,[this.timeLeft],this))
    }

    update() {
        this.physics.overlap(this.player,  this.arrestedObject, this.eatObject, null, this);

        
        this.player.body.velocity.x = 0;
        if (this.cursors.left.isDown) {
        this.player.body.velocity.x = -300;
        //this.player.animations.play('left');
        }
        else if (this.cursors.right.isDown) {
        this.player.body.velocity.x = 300;
        //this.player.animations.play('right');
        }
        if (this.cursors.up.isDown &&(this.player.body.onFloor())) {
        this.player.body.velocity.y = -400;
        } 
    }

    decreaseTime() {
        this.timeLeft--;
        //console.log(this.timeLeft)
        this.timeText.text = '剩餘時間：' + this.timeLeft;
        if (this.timeLeft==0) {
            this.scene.start('GameOver',{
                "score": this.score
            });
        }
    }
    dropObject(){

        let data = this.cache.json.get('gameData');
        let objType = Math.floor(Math.random() * data.arrestedObject.length);
        //console.log(data.arrestedObject);
        let x = Math.floor(Math.random() * 700);
        let key = 'arrestedObject'+ (objType+1);
      
        let gameObject = this.physics.add.sprite(x, 180, key);
        gameObject.point = parseInt(data.arrestedObject[objType].point);
        gameObject.feedback = data.arrestedObject[objType].feedback;
        gameObject.body.velocity.y = 300;
        
        this.arrestedObject.add(gameObject);

        
    }
    eatObject(player,arrestedObject){
        arrestedObject.destroy();
        this.score += arrestedObject.point;
        this.scoreText.text = '分數：' + this.score;
        //console.log(this.player)
        let {x, y} = this.player;
        this.spawnFeedbackBar(x, y, arrestedObject.feedback);
    }
    spawnFeedbackBar(x, y, text){
        let style = {
            font: '32px Monospace',
            fill: '#000000',
            align: 'center'
            }
        //console.log(text)
        this.feedbackBar = this.add.text(x, y - 30, text, style);
        this.time.delayedCall(1000, function (feedbackBar) {
            feedbackBar.destroy();
          }, [this.feedbackBar], this);
      }
      
}

export default SceneMain;