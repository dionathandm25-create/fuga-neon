import Phaser from "phaser";
import {
  getBestScore,
  getTotalCoins,
  getSelectedSkin,
  getSkinById
} from "../utils/storage";

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  create() {
    const { width, height } = this.scale;

    this.add.image(width / 2, height / 2, "bg");

    for (let i = 0; i < 12; i++) {
      const x = 24 + i * 40;
      this.add.rectangle(x, height / 2, 3, height, 0x0d1320, 0.5);
    }

    this.add.text(width / 2, 90, "FUGA", {
      fontSize: "42px",
      color: "#ffffff",
      fontStyle: "bold"
    }).setOrigin(0.5);

    this.add.text(width / 2, 138, "NEON", {
      fontSize: "56px",
      color: "#00e5ff",
      fontStyle: "bold"
    }).setOrigin(0.5);

    this.add.text(width / 2, 184, "Jogo casual premium offline", {
      fontSize: "18px",
      color: "#b9c7da"
    }).setOrigin(0.5);

    const bestScore = getBestScore();
    const totalCoins = getTotalCoins();
    const selectedSkin = getSkinById(getSelectedSkin());

    this.add.image(width / 2, 282, "panelWide").setOrigin(0.5);

    this.add.text(width / 2 - 95, 250, "RECORDE", {
      fontSize: "16px",
      color: "#8ea2c2",
      fontStyle: "bold"
    }).setOrigin(0.5);

    this.add.text(width / 2 - 95, 286, `${bestScore}`, {
      fontSize: "28px",
      color: "#ffd54a",
      fontStyle: "bold"
    }).setOrigin(0.5);

    this.add.text(width / 2 + 8, 250, "MOEDAS", {
      fontSize: "16px",
      color: "#8ea2c2",
      fontStyle: "bold"
    }).setOrigin(0.5);

    this.add.text(width / 2 + 8, 286, `${totalCoins}`, {
      fontSize: "28px",
      color: "#ffffff",
      fontStyle: "bold"
    }).setOrigin(0.5);

    this.add.text(width / 2 + 110, 250, "SKIN", {
      fontSize: "16px",
      color: "#8ea2c2",
      fontStyle: "bold"
    }).setOrigin(0.5);

    this.add.rectangle(width / 2 + 110, 288, 48, 48, selectedSkin.color, 1)
      .setStrokeStyle(3, selectedSkin.stroke);

    const playButton = this.add.image(width / 2, 402, "btnBlue")
      .setInteractive({ useHandCursor: true });

    this.add.text(width / 2, 402, "JOGAR", {
      fontSize: "28px",
      color: "#031018",
      fontStyle: "bold"
    }).setOrigin(0.5);

    playButton.on("pointerdown", () => {
      this.scene.start("GameScene");
    });

    const storeButton = this.add.image(width / 2, 484, "btnGold")
      .setInteractive({ useHandCursor: true });

    this.add.text(width / 2, 484, "LOJA DE SKINS", {
      fontSize: "24px",
      color: "#241b00",
      fontStyle: "bold"
    }).setOrigin(0.5);

    storeButton.on("pointerdown", () => {
      this.scene.start("StoreScene");
    });

    this.add.image(width / 2, 620, "panelLarge").setOrigin(0.5);

    this.add.text(width / 2, 545, "COMO JOGAR", {
      fontSize: "22px",
      color: "#ffffff",
      fontStyle: "bold"
    }).setOrigin(0.5);

    this.add.text(
      width / 2,
      625,
      "• Toque para mover o bloco\n• Desvie dos obstáculos vermelhos\n• Colete moedas douradas\n• Use moedas para desbloquear skins",
      {
        fontSize: "18px",
        color: "#c6d2e3",
        align: "center",
        lineSpacing: 10
      }
    ).setOrigin(0.5);

    this.add.text(width / 2, height - 36, "Criado por Dionathan Martins", {
      fontSize: "16px",
      color: "#70809c"
    }).setOrigin(0.5);
  }
}
