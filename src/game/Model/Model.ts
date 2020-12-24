import IModelData from '../Data/IModelData';
import ModelData from '../Data/ModelData';

class Model {
  private data: ModelData;

  constructor(data: ModelData) {
    this.data = data;
  }

  public initialize(): void {
    this.update(this.data);
  }

  public update(data: IModelData): void {

  }
}

export default Model;
