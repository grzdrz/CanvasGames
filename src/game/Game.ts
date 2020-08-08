import Model from "./MVP/Model/Model";
import Presenter from "./MVP/Presenter";

import ModelData from "./MVP/Model/Data/ModelData";


import ViewData from "./MVP/Views/Data/ViewData";
import ViewManager from "./MVP/Views/ViewManager";

import "./Styles/Game.scss";

const defaultModelData = {};
const defaultViewData = {};

class Game {
    constructor() {
        const presenter = new Presenter(defaultModelData, defaultViewData);
    }
}

export default Game;
