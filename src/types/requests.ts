import IIngredient from "./ingredient";
import { IOrderWithIngredientList } from "./order";
import TUser from "./user";

interface IResponse<T> extends Body {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly type: ResponseType;
  readonly url: string;
  clone(): Response;
  json(): any;
}

export interface IResponseErrorBody {
  message?: string;
}

interface IIngredientsResponseBody {
  success: boolean;
  data: Array<IIngredient>;
}

interface IOrderResponseBody {
  success: boolean;
  name: string;
  order: IOrderWithIngredientList & {owner: {createdAt: string, updatedAt: string, name: string, email: string}};
}

interface IGetUserResponseBody {
  success: boolean;
  user: TUser;
}

interface ILoginResponseBody extends IGetUserResponseBody {
  accessToken: string;
  refreshToken: string;
}

interface IRefreshTokenResponseBody {
  refreshToken: string;
  accessToken: string;
}

interface ILoginRequestBody {
  email: string;
  password: string;
}

interface IRegisterRequestBody extends ILoginRequestBody {
  name: string;
}

interface ILogoutRequestBody {
  token: string | null;
}

interface IUpdateUserRequestBody {
  name?: string;
  email?: string;
  password?: string;
}

interface IRefreshTokenRequestBody {
  token: string | null;
}

type TRequestBody = ILoginRequestBody | IRegisterRequestBody | IUpdateUserRequestBody | ILogoutRequestBody | IRefreshTokenRequestBody;

export type { 
  IResponse, 
  IIngredientsResponseBody, 
  IOrderResponseBody, 
  ILoginResponseBody,
  IGetUserResponseBody,
  IRefreshTokenResponseBody,
  ILoginRequestBody,
  IRegisterRequestBody,
  ILogoutRequestBody,
  IUpdateUserRequestBody,
  IRefreshTokenRequestBody,
  TRequestBody
}