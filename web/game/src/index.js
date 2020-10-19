import Phaser from "phaser";
import Boot from "./scene/boot";
import SceneMain from "./scene/sceneMain";
import GameOver from "./scene/gameOver";

const config = {
    type: Phaser.AUTO,
    parent: "phaser-example",
    width: 800,
    height: 600,
    scene: [Boot, SceneMain, GameOver],
    physics:{
      default:'arcade',
      arcade:{
        debug: true
      }
    }
  };
  
  const game = new Phaser.Game(config);
  

  
  