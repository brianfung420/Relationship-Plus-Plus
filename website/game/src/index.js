import Phaser from "phaser";
import Boot from "./scene/boot";
import SceneMain from "./scene/sceneMain";
import GameOver from "./scene/gameOver";

//const ratio = Math.max(window.innerWidth / window.innerHeight, window.innerHeight / window.innerWidth)
//const DEFAULT_HEIGHT = 600 // any height you want
//const DEFAULT_WIDTH = ratio * DEFAULT_HEIGHT;
const DEFAULT_HEIGHT = 600 // any height you want
const DEFAULT_WIDTH = 800;

const config = {
    type: Phaser.AUTO,
    parent: "phaser-example",
    //mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    scene: [Boot, SceneMain, GameOver],
    physics:{
      default:'arcade'
    }
  };
  
  const game = new Phaser.Game(config);
  

  
  