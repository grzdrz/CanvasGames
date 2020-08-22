import IModelData from "./IModelData";

class ModelData implements IModelData {
  constructor(data: IModelData) {
    this.initialize(data);
  }

  private initialize(data: IModelData): void {

  }
}

export default ModelData;
