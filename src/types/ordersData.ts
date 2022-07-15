import IOrder from "./order";

interface IOrdersData {
  readonly success: boolean;
  readonly total: number;
  readonly totalToday: number;
  readonly orders: Array<IOrder>;
}

export default IOrdersData;