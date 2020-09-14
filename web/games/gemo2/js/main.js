var main = {
    tileSize: 80,
    numRows: 4,
    numCols: 5,
    tileSpacing: 10,
    tilesArray: [],
    selectedArray: [],
    score: 0,
    scoreText: null,
    timeLeft: 0,
    timeText: null,

    preload: function() {
        game.load.spritesheet('tiles', 'assets/tiles.png', this.tileSize, this.tileSize);
        game.load.audio('select', ['assets/select.mp3', 'assets/select.ogg']);
        game.load.audio('right', ['assets/right.mp3', 'assets/right.ogg']);
        game.load.audio('wrong', ['assets/wrong.mp3', 'assets/wrong.ogg']);
    },
  
    create: function() {
        game.stage.disableVisibilityChange = true;
        this.score = 0;
        this.timeLeft = 60;
        this.placeTiles();
        if (titleScreen.playSound) {
            this.selectSound = game.add.audio('select');
            this.rightSound = game.add.audio('right');
            this.wrongSound = game.add.audio('wrong');
          }
          var style = {
            font: '32px Monospace',
            fill: '#00ff00',
            align: 'center'
          }
          this.scoreText = game.add.text(5, 5, '分數：' + this.score, style);
          this.timeText = game.add.text(5, game.height-5,
            '剩餘時間：' + this.timeLeft, style);
            this.timeText.anchor.set(0, 1);
            game.time.events.loop(Phaser.Timer.SECOND, this.decreaseTime, this);
    },
  
    update: function() {
  
    },

    placeTiles: function() {
        var leftSpace = (game.width - this.numCols*this.tileSize - (this.numCols-1)*this.tileSpacing)/2;
        var topSpace = (game.height - this.numRows*this.tileSize - (this.numRows-1)*this.tileSpacing)/2;

        for (var i=0; i<this.numRows*this.numCols; i++) {
            this.tilesArray.push(Math.floor(i/2));
        }
        for (i=0; i<this.numRows*this.numCols; i++) {
            var from = game.rnd.between(0, this.tilesArray.length-1);
            var to = game.rnd.between(0, this.tilesArray.length-1);
            // Swapping two tiles
            var temp = this.tilesArray[from];
            this.tilesArray[from] = this.tilesArray[to];
            this.tilesArray[to] = temp;
          }
        var index = 0;
        for (var i=0; i<this.numRows; i++) {
          for (var j=0; j<this.numCols; j++) {
            var tile = game.add.button(leftSpace + j*(this.tileSize + this.tileSpacing),
                                       topSpace + i*(this.tileSize + this.tileSpacing),
                                       'tiles', this.showTile, this);
            tile.frame = 10;
            tile.value = this.tilesArray[index++];
          }
        }
      },
    showTile: function(target) {

        if (this.selectedArray.length<2 && this.selectedArray.indexOf(target)==-1) {
            if (titleScreen.playSound) {
                this.selectSound.play();
              }
            target.frame = target.value;
            this.selectedArray.push(target);
        }
        if (this.selectedArray.length == 2) {
            if (this.selectedArray.length == 2) {
                game.time.events.add(Phaser.Timer.SECOND, this.checkTiles, this);
              }
          }
      },

      checkTiles: function() {
        if (this.selectedArray[0].value == this.selectedArray[1].value) {
            if (titleScreen.playSound){
                this.rightSound.play();
              }
        this.score++;
        this.scoreText.text = '分數：' + this.score;
          this.selectedArray[0].destroy();
          this.selectedArray[1].destroy();
        }
        else {
            if (titleScreen.playSound){
                this.wrongSound.play();
              }
          this.selectedArray[0].frame = 10;
          this.selectedArray[1].frame = 10;
        }
        this.selectedArray.length = 0;
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
      game.load.spritesheet('soundicons', 'assets/soundicons.png', 80, 80)
    },
  
    create: function() {
      var style = {
        font: "48px Monospace",
        fill: "#00ff00",
        align: "center"
      };
      var text = game.add.text(game.width/2, game.height/2-100, '破解外星密碼', style);
      text.anchor.set(0.5);
      var soundButton = game.add.button(game.width/2-100 , game.height/2+100,
                                                 "soundicons", this.startGame, this);
      soundButton.anchor.set(0.5);
      soundButton = game.add.button(game.width/2+100 , game.height/2+100,
                                            "soundicons", this.startGame, this);
      soundButton.frame = 1;
      soundButton.anchor.set(0.5);
    },
  
    startGame: function(target) {
      if (target.frame == 0) {
        this.playSound = true;
      }
      else {
        this.playSound = false;
      }
      game.state.start('main');
    },
  
  };
  var gameOver = {
    create: function() {
      var style = {
        font: '32px Monospace',
        fill: '#00ff00',
        align: 'center'
      }
      var text = game.add.text(game.width/2, game.height/2,
       '遊戲結束\n\n你的分數：' + main.score + '\n\n點擊重新開始', style);
      text.anchor.set(0.5);
      game.input.onDown.add(this.restartGame, this);
    },
  
    restartGame: function() {
      main.tilesArray.length = 0;
      main.selectedArray.length = 0;
      game.state.start('titleScreen');
    },
  };
  
  var game = new Phaser.Game(500, 500, Phaser.AUTO, 'gameDiv');
  game.state.add('titleScreen', titleScreen);
  game.state.add('main', main);
  game.state.add('gameOver', gameOver);
  game.state.start('titleScreen');
  