import Phaser from "phaser";
import BootScene from "./scenes/BootScene";
import MenuScene from "./scenes/MenuScene";
import StoreScene from "./scenes/StoreScene";
import GameScene from "./scenes/GameScene";
import GameOverScene from "./scenes/GameOverScene";

const config = {
  type: Phaser.AUTO,
  parent: "app",
  width: 480,
  height: 800,
  backgroundColor: "#05070d",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  },
  scene: [BootScene, MenuScene, StoreScene, GameScene, GameOverScene]
};

new Phaser.Game(config);
