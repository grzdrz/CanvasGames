import Event from "../Events/Event";

import IModelData from "../Data/IModelData";
import ModelData from "../Data/ModelData";
import ViewData from "../Data/ViewData";
import IViewData from "../Data/IViewData";
import EventArgs from "../Events/EventArgs";

class Model {
  private data: ModelData;

  public onGetViewData = new Event<IViewData>();
  public onSetViewData = new Event<IViewData>();

  constructor(data: ModelData) {
    this.data = data;
  }

  public initialize(): void {
    this.update(this.data);
  }

  public update(data: IModelData): void {

  }

  public getViewData(): ViewData {
    const eventArgs = new EventArgs<IViewData>({});
    this.onGetViewData.invoke(eventArgs);
    return <ViewData>eventArgs.data;
  }

  public getData(args: EventArgs<IModelData>): void {
    args.data = new ModelData(this.data);
  }
}

export default Model;
