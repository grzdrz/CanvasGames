import IMouseData from "../../../Data/Types/IMouseData";
import AmmunitionType from "../GameObjects/Ammunition/Ammunition.types";
import GameObject from "./GameObject";

interface IShotData extends IMouseData {
  unit: GameObject;
  ammoType: AmmunitionType;
}

export default IShotData;
