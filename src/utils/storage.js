export const STORAGE_KEYS = {
  BEST_SCORE: "fugaNeonBestScore",
  TOTAL_COINS: "fugaNeonTotalCoins",
  SELECTED_SKIN: "fugaNeonSelectedSkin",
  OWNED_SKINS: "fugaNeonOwnedSkins"
};

export const SKINS = [
  {
    id: "cyan",
    name: "Neon Azul",
    color: 0x00e5ff,
    stroke: 0x9af7ff,
    price: 0,
    defaultOwned: true
  },
  {
    id: "green",
    name: "Neon Verde",
    color: 0x39ff88,
    stroke: 0xb7ffd4,
    price: 80
  },
  {
    id: "purple",
    name: "Neon Roxo",
    color: 0xb45cff,
    stroke: 0xe0b7ff,
    price: 180
  },
  {
    id: "orange",
    name: "Neon Laranja",
    color: 0xff8a3d,
    stroke: 0xffc9a3,
    price: 320
  },
  {
    id: "pink",
    name: "Neon Rosa",
    color: 0xff4fa3,
    stroke: 0xffbfd8,
    price: 500
  }
];

function parseJSON(value, fallback) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function initializeGameData() {
  if (localStorage.getItem(STORAGE_KEYS.BEST_SCORE) === null) {
    localStorage.setItem(STORAGE_KEYS.BEST_SCORE, "0");
  }

  if (localStorage.getItem(STORAGE_KEYS.TOTAL_COINS) === null) {
    localStorage.setItem(STORAGE_KEYS.TOTAL_COINS, "0");
  }

  if (localStorage.getItem(STORAGE_KEYS.SELECTED_SKIN) === null) {
    localStorage.setItem(STORAGE_KEYS.SELECTED_SKIN, "cyan");
  }

  if (localStorage.getItem(STORAGE_KEYS.OWNED_SKINS) === null) {
    localStorage.setItem(
      STORAGE_KEYS.OWNED_SKINS,
      JSON.stringify(["cyan"])
    );
  }
}

export function getBestScore() {
  return Number(localStorage.getItem(STORAGE_KEYS.BEST_SCORE) || 0);
}

export function setBestScore(score) {
  localStorage.setItem(STORAGE_KEYS.BEST_SCORE, String(score));
}

export function getTotalCoins() {
  return Number(localStorage.getItem(STORAGE_KEYS.TOTAL_COINS) || 0);
}

export function setTotalCoins(total) {
  localStorage.setItem(STORAGE_KEYS.TOTAL_COINS, String(total));
}

export function addCoins(amount) {
  const current = getTotalCoins();
  const updated = current + amount;
  setTotalCoins(updated);
  return updated;
}

export function spendCoins(amount) {
  const current = getTotalCoins();

  if (current < amount) {
    return false;
  }

  setTotalCoins(current - amount);
  return true;
}

export function getSelectedSkin() {
  return localStorage.getItem(STORAGE_KEYS.SELECTED_SKIN) || "cyan";
}

export function setSelectedSkin(skinId) {
  localStorage.setItem(STORAGE_KEYS.SELECTED_SKIN, skinId);
}

export function getOwnedSkins() {
  return parseJSON(localStorage.getItem(STORAGE_KEYS.OWNED_SKINS), ["cyan"]);
}

export function ownsSkin(skinId) {
  return getOwnedSkins().includes(skinId);
}

export function unlockSkin(skinId) {
  const owned = getOwnedSkins();

  if (!owned.includes(skinId)) {
    owned.push(skinId);
    localStorage.setItem(STORAGE_KEYS.OWNED_SKINS, JSON.stringify(owned));
  }
}

export function getSkinById(skinId) {
  return SKINS.find((skin) => skin.id === skinId) || SKINS[0];
}

export function tryBuySkin(skinId) {
  const skin = getSkinById(skinId);

  if (!skin) {
    return { success: false, reason: "Skin não encontrada." };
  }

  if (ownsSkin(skinId)) {
    return { success: false, reason: "Você já possui esta skin." };
  }

  if (!spendCoins(skin.price)) {
    return { success: false, reason: "Moedas insuficientes." };
  }

  unlockSkin(skinId);

  return { success: true };
}
