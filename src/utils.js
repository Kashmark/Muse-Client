export const apiUrl = "http://localhost:8000"

export const getToken = () => {
  if (localStorage.getItem("art_token")) {
    const token = JSON.parse(localStorage.getItem("art_token")).token
    return token
  } else {
    return null
  }
}