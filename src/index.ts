import { Game, Types } from "phaser";
import "phaser/plugins/spine/dist/SpinePlugin";
import "reflect-metadata";
import { LoadingScene } from "./scenes/loading.scene";
import { SlotScene } from "./scenes/slot.scene";

declare global {
  interface Window {
    sizeChanged: () => void;
    game: Phaser.Game;
    SpinePlugin: any;
  }
}

const gameConfig: Types.Core.GameConfig = {
  title: "Phaser game tutorial",
  type: Phaser.WEBGL,
  parent: "game",
  backgroundColor: "#101010",
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1920,
    height: 1080,
  },
  // physics: {
  //   default: "arcade",
  //   arcade: {
  //     debug: false,
  //   },
  // },
  render: {
    antialiasGL: false,
    pixelArt: false,
  },
  // callbacks: {
  //   postBoot: () => {
  //     window.sizeChanged();
  //   },
  // },
  // canvasStyle: `display: block; width: 100%; height: 100%;`,
  autoFocus: false,
  audio: {
    disableWebAudio: false,
  },
  scene: [LoadingScene, SlotScene],
  plugins: {
    scene: [
      { key: "SpinePlugin", plugin: window.SpinePlugin, mapping: "spine" },
    ],
  },
};

// window.sizeChanged = () => {
//   if (window.game.isBooted) {
//     setTimeout(() => {
//       window.game.scale.resize(window.innerWidth, window.innerHeight);
//       window.game.canvas.setAttribute(
//         "style",
//         `display: block; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`
//       );
//     }, 100);
//   }
// };
// window.onresize = () => window.sizeChanged();

window.game = new Game(gameConfig);
