import Presenter from "./game/Presenter";

require.context("./", true, /\.(ttf|eot|woff|woff2|svg|png|jpg)$/);

declare global {
  var GLOBAL_TIME_STAMP: DOMHighResTimeStamp;
}

const presenter = new Presenter();
