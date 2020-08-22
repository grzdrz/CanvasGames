import MainMenuView from "./MainMenuView";
import View from "./View";
import EntryType from "./EntryType";
import Texture from "./Texture";
import Vector from "../../Helpers/Vector";

class MainMenuEntry {
  public view: View;
  public type: EntryType;
  public menu: MainMenuView;
  public position = Vector.zero;
  public scale: number;
  public alpha: number;

  public height = 0;
  public width = 0;
  public buttonScale = 0;
  public sizeScaleInPercent = 0;

  private selectionFade = 0;

  //-----------------------------------

  public testWidth = 50;
  public testHeight = 50;
  //private texScrollButton: Texture;
  //-----------------------------------

  constructor(menu: MainMenuView, type: EntryType, view: View) {
    this.view = view;
    this.type = type;
    this.menu = menu;
    this.scale = 0.9;
    this.alpha = 1.0;
  }

  public initialize(): void {
    const viewport_height = this.menu.viewManager.canvasManager.height;
    const viewport_width = this.menu.viewManager.canvasManager.width;
    if (this.type === EntryType.Screen) {
      this.sizeScaleInPercent = 20;
      //this.gameIcon1 = new Sprite(this.menu.ScreenManager.Content.Load<Texture2D>("gameObjs\\buttonPlay"));
      const percentage = (viewport_width) / (100 / this.sizeScaleInPercent);
      this.buttonScale = percentage / this.testWidth;
    }
    else if (this.type == EntryType.ExitItem) {
      this.sizeScaleInPercent = 10;
      //this.gameIcon1 = new Sprite(this.menu.ScreenManager.Content.Load<Texture2D>("gameObjs\\buttonExit"));
      const percentage = (viewport_width) / (100 / this.sizeScaleInPercent);
      this.buttonScale = percentage / this.testWidth;
    }

    this.width = this.testWidth * this.buttonScale;
    this.height = this.testHeight * this.buttonScale;
  }

}

export default MainMenuEntry;
