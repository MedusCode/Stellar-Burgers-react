import { IResponse } from "../../types/requests"

const checkResponse = async <TResponseBody = { success: boolean }>(res: IResponse<TResponseBody>): Promise<TResponseBody> => {
  const body: TResponseBody = await res.json()
  if (res.ok) return body 
  return Promise.reject({status: res.status, body})
}

export default checkResponse;
