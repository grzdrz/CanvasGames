/* import ViewManager from "../../ViewSystem/ViewManager";
import Game from "../Game";
import GameObject from "../GameObjects/GameObject";
import Collisions from "./Collisions";

class World {
  public game: Game;
  public viewManager: ViewManager;
  public collisions: Collisions;

  public readonly g = 9.81;

  public constructor(game: Game) {
    this.game = game;
    this.viewManager = this.game.viewManager;

    this.collisions = new Collisions(this.viewManager);
  }

  loadContent() {
    this.collisions.loadContent();
  }

  unloadContent() {
    this.collisions.unloadContent();
  }

  update(gameTime: DOMHighResTimeStamp) {
    this.game.gameObjects.forEach((object) => {
      this.addGravity(gameTime, object);
      object.update(gameTime);
    });
    this.collisions.findAllObjectsCollisions(this.game.gameObjects);
  }

  addGravity(gameTime: DOMHighResTimeStamp, object: GameObject) {
    gameTime *= 10;
    if (!object.isGriped) {
      if (!object.isStatic) {
        object.velocity.y += this.g * gameTime;
        object.position.x += object.velocity.x * gameTime;
        object.position.y += object.velocity.y * gameTime;
      } else {
        object.velocity.x = 0;
        object.velocity.y = 0;
      }
    }
  }
}

export default World; */
