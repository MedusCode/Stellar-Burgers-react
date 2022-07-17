import IIngredient from "../../types/ingredient";
import { IOrderWithIngredientList } from "../../types/order";

const OPEN_MODAL: 'OPEN_MODAL'  = 'OPEN_MODAL';
const CLOSE_MODAL: 'CLOSE_MODAL' = 'CLOSE_MODAL';

interface IOpenModalAction {
  type: typeof OPEN_MODAL;
  modalType: 'order-details' | 'confirmation' | 'request' | 'ingredient' | 'order';
  ingredient?: IIngredient;
  order?: IOrderWithIngredientList;
  text?: string;
  handler?: () => void;
}

interface ICloseModalAction {
  type: typeof CLOSE_MODAL;
}

export type TModalActions = IOpenModalAction | ICloseModalAction;

export { OPEN_MODAL, CLOSE_MODAL };
