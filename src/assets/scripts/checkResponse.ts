import { IResponse, IResponseBody } from "../../types/request"

const checkResponse = async <TData>(res: IResponse<IResponseBody<TData>>): Promise<IResponseBody<TData>> => {
  const body: IResponseBody<TData> = await res.json()
  if (res.ok) return body 
  return Promise.reject({status: res.status, body})
}

export default checkResponse;
