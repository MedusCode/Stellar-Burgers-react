interface IResponseBody<TDataType> {
  success: boolean;
  user?: TDataType;
  message?: string;
};

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

export type { IResponse, IResponseBody }