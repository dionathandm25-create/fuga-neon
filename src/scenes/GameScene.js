import Phaser from "phaser";
import {
  getSelectedSkin,
  getSkinById
} from "../utils/storage";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    const { width, height } = this.scale;

    this.add.image(width / 2, height / 2, "bg");

    this.score = 0;
    this.runCoins = 0;
    this.gameSpeed = 260;
    this.isGameOver = false;
    this.isPausedGame = false;

    this.bgLines = [];
    for (let i = 0; i < 10; i++) {
      const line = this.add.rectangle(
        40 + i * 45,
        height / 2,
        3,
        height,
        0x0f1726,
        0.6
      );
      this.bgLines.push(line);
    }

    const selectedSkinId = getSelectedSkin();
    const selectedSkin = getSkinById(selectedSkinId);

    this.playerGlow = this.add.rectangle(
      width / 2,
      height - 110,
      88,
      88,
      selectedSkin.color,
      0.14
    );

    this.player = this.physics.add.sprite(
      width / 2,
      height - 110,
      `player-${selectedSkinId}`
    );
    this.player.setCollideWorldBounds(true);
    this.player.body.setAllowGravity(false);

    this.obstacles = this.physics.add.group();
    this.coinGroup = this.physics.add.group();

    this.topBar = this.add.rectangle(width / 2, 44, width - 20, 70, 0x101826, 0.92)
      .setStrokeStyle(2, 0x273248);

    this.scoreText = this.add.text(24, 24, "Pontos: 0", {
      fontSize: "24px",
      color: "#ffffff",
      fontStyle: "bold"
    });

    this.coinText = this.add.text(24, 52, "Moedas: 0", {
      fontSize: "18px",
      color: "#ffd54a",
      fontStyle: "bold"
    });

    this.pauseButtonBg = this.add.rectangle(width - 58, 42, 70, 42, 0xffd54a, 1)
      .setStrokeStyle(2, 0xfff0a8)
      .setInteractive({ useHandCursor: true });

    this.pauseButtonText = this.add.text(width - 58, 42, "II", {
      fontSize: "22px",
      color: "#1b1400",
      fontStyle: "bold"
    }).setOrigin(0.5);

    this.pauseButtonBg.on("pointerdown", () => {
      if (this.isGameOver) return;
      this.togglePause();
    });

    this.pauseOverlay = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.48)
      .setVisible(false);

    this.pausePanel = this.add.image(width / 2, height / 2, "panelLarge")
      .setVisible(false);

    this.pauseTitle = this.add.text(width / 2, height / 2 - 45, "JOGO PAUSADO", {
      fontSize: "28px",
      color: "#ffffff",
      fontStyle: "bold"
    }).setOrigin(0.5).setVisible(false);

    this.resumeText = this.add.text(width / 2, height / 2 + 2, "Toque no botão pause para continuar", {
      fontSize: "17px",
      color: "#c9d4e3",
      align: "center",
      wordWrap: { width: 260 }
    }).setOrigin(0.5).setVisible(false);

    this.menuButton = this.add.rectangle(width / 2, height / 2 + 72, 180, 48, 0x00e5ff, 1)
      .setStrokeStyle(2, 0x9af7ff)
      .setVisible(false)
      .setInteractive({ useHandCursor: true });

    this.menuButtonLabel = this.add.text(width / 2, height / 2 + 72, "MENU", {
      fontSize: "22px",
      color: "#031018",
      fontStyle: "bold"
    }).setOrigin(0.5).setVisible(false);

    this.menuButton.on("pointerdown", () => {
      this.scene.start("MenuScene");
    });

    this.input.on("pointermove", (pointer) => {
      if (this.isGameOver || this.isPausedGame) return;
      this.player.x = Phaser.Math.Clamp(pointer.x, 40, width - 40);
    });

    this.input.on("pointerdown", (pointer) => {
      if (this.isGameOver || this.isPausedGame) return;

      if (pointer.y <= 80 && pointer.x >= width - 100) {
        return;
      }

      if (pointer.x < width / 2) {
        this.player.x -= 70;
      } else {
        this.player.x += 70;
      }

      this.player.x = Phaser.Math.Clamp(this.player.x, 40, width - 40);
    });

    this.spawnObstacleEvent = this.time.addEvent({
      delay: 850,
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true
    });

    this.spawnCoinEvent = this.time.addEvent({
      delay: 1450,
      callback: this.spawnCoin,
      callbackScope: this,
      loop: true
    });

    this.scoreEvent = this.time.addEvent({
      delay: 200,
      callback: () => {
        if (!this.isGameOver && !this.isPausedGame) {
          this.score += 1;
          this.scoreText.setText(`Pontos: ${this.score}`);
        }
      },
      loop: true
    });

    this.physics.add.overlap(this.player, this.coinGroup, this.collectCoin, null, this);
    this.physics.add.overlap(this.player, this.obstacles, this.hitObstacle, null, this);
  }

  togglePause() {
    this.isPausedGame = !this.isPausedGame;

    if (this.isPausedGame) {
      this.physics.pause();
      this.pauseOverlay.setVisible(true);
      this.pausePanel.setVisible(true);
      this.pauseTitle.setVisible(true);
      this.resumeText.setVisible(true);
      this.menuButton.setVisible(true);
      this.menuButtonLabel.setVisible(true);
      this.pauseButtonText.setText("▶");
    } else {
      this.physics.resume();
      this.pauseOverlay.setVisible(false);
      this.pausePanel.setVisible(false);
      this.pauseTitle.setVisible(false);
      this.resumeText.setVisible(false);
      this.menuButton.setVisible(false);
      this.menuButtonLabel.setVisible(false);
      this.pauseButtonText.setText("II");
    }
  }

  spawnObstacle() {
    if (this.isPausedGame || this.isGameOver) return;

    const { width } = this.scale;
    const x = Phaser.Math.Between(50, width - 50);
    const obstacle = this.obstacles.create(x, -80, "obstacle");

    obstacle.setVelocityY(this.gameSpeed);
    obstacle.body.setAllowGravity(false);
  }

  spawnCoin() {
    if (this.isPausedGame || this.isGameOver) return;

    const { width } = this.scale;
    const x = Phaser.Math.Between(40, width - 40);
    const coin = this.coinGroup.create(x, -40, "coin");

    coin.setVelocityY(this.gameSpeed - 40);
    coin.body.setAllowGravity(false);
  }

  collectCoin(player, coin) {
    coin.destroy();
    this.runCoins += 1;
    this.score += 10;
    this.coinText.setText(`Moedas: ${this.runCoins}`);
    this.scoreText.setText(`Pontos: ${this.score}`);
  }

  hitObstacle() {
    if (this.isGameOver) return;

    this.isGameOver = true;
    this.isPausedGame = false;

    this.physics.pause();

    this.time.delayedCall(650, () => {
      this.scene.start("GameOverScene", {
        score: this.score,
        coins: this.runCoins
      });
    });
  }

  update() {
    if (this.isGameOver || this.isPausedGame) return;

    this.gameSpeed += 0.03;

    this.playerGlow.x = this.player.x;
    this.playerGlow.y = this.player.y;

    this.bgLines.forEach((line) => {
      line.y += 8;

      if (line.y > 1200) {
        line.y = -400;
      }
    });

    this.obstacles.getChildren().forEach((obstacle) => {
      obstacle.setVelocityY(this.gameSpeed);

      if (obstacle.y > 900) {
        obstacle.destroy();
      }
    });

    this.coinGroup.getChildren().forEach((coin) => {
      coin.setVelocityY(this.gameSpeed - 40);

      if (coin.y > 900) {
        coin.destroy();
      }
    });
  }
}
