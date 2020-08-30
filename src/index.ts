import Presenter from "./game/Presenter";

require.context('./', true, /\.(ttf|eot|woff|woff2|svg|png|jpg)$/);

const presenter = new Presenter();