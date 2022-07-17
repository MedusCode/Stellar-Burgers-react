import IIngredient from "./ingredient";

interface IOrder {
  readonly _id: string;
  readonly name: string;
  readonly status: string;
  readonly number: number; 
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly ingredients: Array<string>
}

interface IOrderWithIngredientList {
  readonly _id: string;
  readonly name: string;
  readonly status: string;
  readonly number: number; 
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly ingredients: Array<IIngredient>
  price: number; 
}

export default IOrder;
export type { IOrderWithIngredientList };
