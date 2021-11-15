import { Scene } from "phaser";
import { preloadData } from "../game/circle/preload";
import { dialogs } from "./assets/dialogs";
import { gameResourcesData } from "./assets/preloadData";
import { Player } from "./modules";
import { Dialog } from "./modules/Dialog";
import { Extensions } from "./modules/Extensions";
import { Level } from "./modules/Level";

export default class DefaultScene extends Scene {
  player: Player | null = null;
  extensions!: Extensions;
  dialog: Dialog | null = null;
  map: Phaser.Tilemaps.Tilemap | null = null;
  world: Phaser.Tilemaps.TilemapLayer | null = null;

  preload() {
    this.extensions = new Extensions(this);
    preloadData.call(this, gameResourcesData);
  }
  create() {
    this.map = this.make.tilemap({ key: "map" });
    const tileset = this.map.addTilesetImage(
      "platforms32x32",
      "platforms32x32"
    );
    this.world = this.map.createLayer(0, tileset, 0, 0);

    this.player = new Player(this);
    this.dialog = new Dialog(this, dialogs, 0);
    const level = new Level(this);
  }

  update(time: number, delta: number) {
    this.player?.update(time, delta, this.dialog?.activeDialog?.isActive);
  }
}
