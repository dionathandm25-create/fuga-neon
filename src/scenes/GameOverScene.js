import Phaser from "phaser";
import {
  getBestScore,
  setBestScore,
  addCoins,
  getTotalCoins
} from "../utils/storage";

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOverScene");
  }

  init(data) {
    this.finalScore = data.score || 0;
    this.finalCoins = data.coins || 0;
  }

  create() {
    const { width, height } = this.scale;

    this.add.image(width / 2, height / 2, "bg");

    const currentBest = getBestScore();
    if (this.finalScore > currentBest) {
      setBestScore(this.finalScore);
    }

    const updatedBest = getBestScore();
    const updatedTotalCoins = addCoins(this.finalCoins);

    this.add.text(width / 2, 110, "FIM DE JOGO", {
      fontSize: "40px",
      color: "#ff5a6f",
      fontStyle: "bold"
    }).setOrigin(0.5);

    this.add.image(width / 2, 305, "panelLarge").setDisplaySize(350, 250);

    this.add.text(width / 2, 218, "RESULTADO DA PARTIDA", {
      fontSize: "20px",
      color: "#9db0cb",
      fontStyle: "bold"
    }).setOrigin(0.5);

    this.add.text(width / 2, 266, `Pontos: ${this.finalScore}`, {
      fontSize: "28px",
      color: "#ffffff",
      fontStyle: "bold"
    }).setOrigin(0.5);

    this.add.text(width / 2, 310, `Moedas ganhas: ${this.finalCoins}`, {
      fontSize: "24px",
      color: "#ffd54a",
      fontStyle: "bold"
    }).setOrigin(0.5);

    this.add.text(width / 2, 352, `Total salvo: ${updatedTotalCoins}`, {
      fontSize: "22px",
      color: "#9fffc8",
      fontStyle: "bold"
    }).setOrigin(0.5);

    this.add.text(width / 2, 394, `Recorde: ${updatedBest}`, {
      fontSize: "24px",
      color: "#00e5ff",
      fontStyle: "bold"
    }).setOrigin(0.5);

    const replayButton = this.add.image(width / 2, 520, "btnBlue")
      .setInteractive({ useHandCursor: true });

    this.add.text(width / 2, 520, "JOGAR DE NOVO", {
      fontSize: "23px",
      color: "#031018",
      fontStyle: "bold"
    }).setOrigin(0.5);

    replayButton.on("pointerdown", () => {
      this.scene.start("GameScene");
    });

    const menuButton = this.add.image(width / 2, 600, "btnGold")
      .setInteractive({ useHandCursor: true });

    this.add.text(width / 2, 600, "MENU / LOJA", {
      fontSize: "22px",
      color: "#1b1400",
      fontStyle: "bold"
    }).setOrigin(0.5);

    menuButton.on("pointerdown", () => {
      this.scene.start("MenuScene");
    });

    this.add.text(width / 2, height - 36, "Continue jogando para liberar todas as skins", {
      fontSize: "16px",
      color: "#7e8ca3"
    }).setOrigin(0.5);
  }
}
