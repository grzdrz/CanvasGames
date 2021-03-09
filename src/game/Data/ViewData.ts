import IViewData from "./Types/IViewData";

class ViewData implements IViewData {


  constructor(data: IViewData) {
    this.initialize(data);
  }

  private initialize(data: IViewData): void {

  }
}

export default ViewData;
