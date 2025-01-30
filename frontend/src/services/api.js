const BASE_URL = "http://localhost:8000/"

export const getRequest = async (endPoint) => {
  const token = localStorage.getItem("token")
  const response = await fetch(`${BASE_URL}${endPoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token ? `Bearer ${token}` : "",
    },
  })
  return response.json()
}

export const postRequest = async (endPoint, body={}) => {
  const token = localStorage.getItem("token")
  const response = await fetch(`${BASE_URL}${endPoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(body),
  })
  return response.json()
}
