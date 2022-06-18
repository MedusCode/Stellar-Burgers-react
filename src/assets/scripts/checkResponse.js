const checkResponse = async (res) => {
  const body = await res.json()
  if (res.ok) return body 
  return Promise.reject({status: res.status, body})
}

export default checkResponse;
