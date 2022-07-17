interface IIngredient {
  readonly _id: string;
  readonly name: string;
  readonly type: 'bun' | 'sauce' | 'main';
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
  readonly nanoid?: string;
  amount?: number;
}

export type TBun = Omit<IIngredient, 'type'> & { type: 'bun' }

export default IIngredient;