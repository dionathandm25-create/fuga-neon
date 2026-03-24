import Phaser from "phaser";
import { SKINS, initializeGameData } from "../utils/storage";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  create() {
    initializeGameData();

    const { width, height } = this.scale;
    const g = this.add.graphics();

    g.fillStyle(0x05070d, 1);
    g.fillRect(0, 0, width, height);

    for (let i = 0; i < 90; i++) {
      const x = Phaser.Math.Between(0, width);
      const y = Phaser.Math.Between(0, height);
      const radius = Phaser.Math.Between(1, 3);
      const alphaColor = i % 2 === 0 ? 0x12192a : 0x0d1320;
      g.fillStyle(alphaColor, 1);
      g.fillCircle(x, y, radius);
    }

    g.generateTexture("bg", width, height);
    g.clear();

    g.fillStyle(0xff4a67, 1);
    g.fillRoundedRect(0, 0, 72, 72, 12);
    g.lineStyle(4, 0xffb3bf, 1);
    g.strokeRoundedRect(2, 2, 68, 68, 12);
    g.generateTexture("obstacle", 72, 72);
    g.clear();

    g.fillStyle(0xffd54a, 1);
    g.fillCircle(20, 20, 18);
    g.lineStyle(4, 0xfff3b2, 1);
    g.strokeCircle(20, 20, 18);
    g.generateTexture("coin", 40, 40);
    g.clear();

    g.fillStyle(0x00e5ff, 1);
    g.fillRoundedRect(0, 0, 220, 64, 18);
    g.generateTexture("btnBlue", 220, 64);
    g.clear();

    g.fillStyle(0xffd54a, 1);
    g.fillRoundedRect(0, 0, 220, 64, 18);
    g.generateTexture("btnGold", 220, 64);
    g.clear();

    g.fillStyle(0x1b2436, 0.96);
    g.fillRoundedRect(0, 0, 320, 140, 22);
    g.lineStyle(3, 0x34415d, 1);
    g.strokeRoundedRect(2, 2, 316, 136, 22);
    g.generateTexture("panelWide", 320, 140);
    g.clear();

    g.fillStyle(0x1b2436, 0.96);
    g.fillRoundedRect(0, 0, 340, 220, 22);
    g.lineStyle(3, 0x34415d, 1);
    g.strokeRoundedRect(2, 2, 336, 216, 22);
    g.generateTexture("panelLarge", 340, 220);
    g.clear();

    g.fillStyle(0x152033, 0.98);
    g.fillRoundedRect(0, 0, 380, 160, 20);
    g.lineStyle(3, 0x32425d, 1);
    g.strokeRoundedRect(2, 2, 376, 156, 20);
    g.generateTexture("panelStore", 380, 160);
    g.clear();

    for (const skin of SKINS) {
      g.fillStyle(skin.color, 1);
      g.fillRoundedRect(0, 0, 64, 64, 14);
      g.lineStyle(4, skin.stroke, 1);
      g.strokeRoundedRect(2, 2, 60, 60, 14);
      g.generateTexture(`player-${skin.id}`, 64, 64);
      g.clear();

      g.fillStyle(skin.color, 0.25);
      g.fillRoundedRect(0, 0, 96, 96, 18);
      g.generateTexture(`glow-${skin.id}`, 96, 96);
      g.clear();
    }

    this.scene.start("MenuScene");
  }
}
