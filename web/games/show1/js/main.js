var main = {

  score: 0,
  scoreText: null,
  timeLeft: 0,
  timeText: null,
  

  preload: function() {
    game.load.image('background', 'assets/images/background.png');
    game.load.image('dude', 'assets/images/player.png'); 
    game.load.image('food1', 'assets/images/food1.png'); 
    game.load.image('food2', 'assets/images/food2.png'); 
    game.load.image('food3', 'assets/images/food3.png'); 
  },

  create: function() {
    this.score = 0;
    this.timeLeft = 60;
    game.physics.startSystem(Phaser.Physics.ARCADE);
  
    game.add.image(0, 0, 'background');
    
    this.foods = game.add.group();
    this.foods.enableBody = true;
  
    

    this.player = game.add.sprite(320, 400, 'dude');
    game.physics.arcade.enable(this.player);
    this.player.body.gravity.y = 500;
    this.player.body.collideWorldBounds = true;
    this.player.scale.setTo(0.5,0.5);
 
    this.cursors = game.input.keyboard.createCursorKeys(); 
    
    game.time.events.loop(Phaser.Timer.SECOND, this.dropFood, this);
    var style = {
      font: '32px Monospace',
      fill: '#000000',
      align: 'center'
    }
    this.scoreText = game.add.text(5, 5, '分數：' + this.score, style);
    this.timeText = game.add.text(game.width/2-100,100,
      '剩餘時間：' + this.timeLeft, style);
    this.timeText.anchor.set(0, 1);
    game.time.events.loop(Phaser.Timer.SECOND, this.decreaseTime, this);
  },

  update: function() {
  //game.physics.arcade.collide(this.player, this.foods);
  this.game.physics.arcade.overlap(this.player,  this.foods, this.eatFood, null, this);

    this.player.body.velocity.x = 0;
    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -200;
      //this.player.animations.play('left');
    }
    else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = 200;
      //this.player.animations.play('right');
    }
    if (this.cursors.up.isDown &&(this.player.body.onFloor())) {
      this.player.body.velocity.y = -350;
    } 
  },

 eatFood: function(player,food) {
  food.destroy();
  this.score++;
  this.scoreText.text = '分數：' + this.score;
 },
 dropFood: function(){
   var foodType = game.rnd.between(1, 3);
  var x = game.rnd.between(0, 700);
  this.foods.create(x, 180, 'food'+foodType);
  this.foods.setAll('body.velocity.y', 300); 
 },
 decreaseTime: function() {
    this.timeLeft--;
    this.timeText.text = '剩餘時間：' + this.timeLeft;
    if (this.timeLeft==0) {
      game.state.start('gameOver');
    }
  },
};
var titleScreen = {

  preload: function() {
    game.load.image('startButton', 'assets/images/start_btn.png'); 
    game.load.image('background', 'assets/images/background.png');
  },

  create: function() {
    game.add.image(0, 0, 'background');
    var style = {
      font: "48px Monospace",
      fill: "#000000",
      align: "center"
    };
    var text = game.add.text(game.width/2, game.height/2-100, 'XXX', style);
    text.anchor.set(0.5);
    var startButton = game.add.button(game.width/2 , game.height/2+100,
                                               "startButton", this.startGame, this);
   
    
    startButton.anchor.set(0.5);
  },

  startGame: function(target) {
  
    game.state.start('main');
  },

};

var gameOver = {
  preload: function() {
    game.load.image('background', 'assets/images/background.png');
  },
  create: function() {
    game.add.image(0, 0, 'background');
    var style = {
      font: '32px Monospace',
      fill: '#000000',
      align: 'center'
    }
    var text = game.add.text(game.width/2, game.height/2,
     '遊戲結束\n\n你的分數：' + main.score + '\n\nXXXXXXX' + '\n\n點擊重新開始', style);
    text.anchor.set(0.5);
    game.input.onDown.add(this.restartGame, this);
  },

  restartGame: function() {
    game.state.start('titleScreen');
  },
};
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');
game.state.add('main', main);
game.state.add('titleScreen', titleScreen);
game.state.add('gameOver', gameOver);

game.state.start('titleScreen');