import Model from "./MVP/Model/Model";
import Presenter from "./MVP/Presenter";

import IModelData from "./MVP/Model/Data/IModelData";
import ModelData from "./MVP/Model/Data/ModelData";

import IViewData from "./MVP/Views/Data/IViewData";

import ViewData from "./MVP/Views/Data/ViewData";
import ViewManager from "./MVP/Views/ViewManager";

import "./Styles/RangeSlider.scss";

const defaultModelData = {};
const defaultViewData = {};

class Game {
    constructor() {
        const canvas = <HTMLElement>(document.querySelector(".game"));

        const modelData = new ModelData(defaultModelData);
        const viewData = new ViewData(defaultViewData);

        const model = new Model(modelData);
        const viewManager = new ViewManager(viewData, canvas);
    }
}

export default Game;
