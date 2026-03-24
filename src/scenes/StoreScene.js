import Phaser from "phaser";
import {
  SKINS,
  getTotalCoins,
  getOwnedSkins,
  getSelectedSkin,
  setSelectedSkin,
  tryBuySkin,
  ownsSkin
} from "../utils/storage";

export default class StoreScene extends Phaser.Scene {
  constructor() {
    super("StoreScene");
  }

  create() {
    const { width, height } = this.scale;

    this.add.image(width / 2, height / 2, "bg");

    this.add.text(width / 2, 55, "LOJA DE SKINS", {
      fontSize: "34px",
      color: "#ffffff",
      fontStyle: "bold"
    }).setOrigin(0.5);

    this.totalCoinsText = this.add.text(width / 2, 95, `Moedas: ${getTotalCoins()}`, {
      fontSize: "22px",
      color: "#ffd54a",
      fontStyle: "bold"
    }).setOrigin(0.5);

    const backButton = this.add.rectangle(72, 48, 100, 42, 0x00e5ff, 1)
      .setStrokeStyle(2, 0x9af7ff)
      .setInteractive({ useHandCursor: true });

    this.add.text(72, 48, "MENU", {
      fontSize: "18px",
      color: "#031018",
      fontStyle: "bold"
    }).setOrigin(0.5);

    backButton.on("pointerdown", () => {
      this.scene.start("MenuScene");
    });

    this.feedbackText = this.add.text(width / 2, height - 28, "", {
      fontSize: "16px",
      color: "#c6d2e3",
      align: "center"
    }).setOrigin(0.5);

    const startY = 170;
    const gapY = 168;

    SKINS.forEach((skin, index) => {
      const y = startY + index * gapY;

      const panel = this.add.image(width / 2, y, "panelStore").setOrigin(0.5);

      this.add.image(90, y, `player-${skin.id}`).setDisplaySize(70, 70);

      this.add.text(190, y - 40, skin.name, {
        fontSize: "24px",
        color: "#ffffff",
        fontStyle: "bold"
      }).setOrigin(0.5);

      this.add.text(190, y - 8, `Preço: ${skin.price} moedas`, {
        fontSize: "18px",
        color: "#ffd54a"
      }).setOrigin(0.5);

      const isOwned = ownsSkin(skin.id);
      const isSelected = getSelectedSkin() === skin.id;

      const statusText = isSelected
        ? "Selecionada"
        : isOwned
        ? "Comprada"
        : "Bloqueada";

      const statusColor = isSelected
        ? "#39ff88"
        : isOwned
        ? "#9fd6ff"
        : "#ff9090";

      const statusLabel = this.add.text(190, y + 24, statusText, {
        fontSize: "18px",
        color: statusColor,
        fontStyle: "bold"
      }).setOrigin(0.5);

      const buttonBg = this.add.rectangle(340, y, 90, 46, 0x00e5ff, 1)
        .setStrokeStyle(2, 0x9af7ff)
        .setInteractive({ useHandCursor: true });

      const buttonLabel = this.add.text(340, y, "", {
        fontSize: "16px",
        color: "#031018",
        fontStyle: "bold",
        align: "center"
      }).setOrigin(0.5);

      const refreshCard = () => {
        const owned = ownsSkin(skin.id);
        const selected = getSelectedSkin() === skin.id;

        const label = selected ? "USANDO" : owned ? "ESCOLHER" : "COMPRAR";
        buttonLabel.setText(label);

        statusLabel.setText(
          selected ? "Selecionada" : owned ? "Comprada" : "Bloqueada"
        );

        statusLabel.setColor(
          selected ? "#39ff88" : owned ? "#9fd6ff" : "#ff9090"
        );

        this.totalCoinsText.setText(`Moedas: ${getTotalCoins()}`);
      };

      refreshCard();

      buttonBg.on("pointerdown", () => {
        if (ownsSkin(skin.id)) {
          setSelectedSkin(skin.id);
          this.feedbackText.setText(`Skin ${skin.name} selecionada com sucesso.`);
          this.scene.restart();
          return;
        }

        const result = tryBuySkin(skin.id);

        if (result.success) {
          setSelectedSkin(skin.id);
          this.feedbackText.setText(`Você comprou e equipou a skin ${skin.name}.`);
          this.scene.restart();
        } else {
          this.feedbackText.setText(result.reason);
          refreshCard();
        }
      });
    });
  }
}
