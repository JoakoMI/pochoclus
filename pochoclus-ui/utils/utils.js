export function getLocalStorageToken() {
  return typeof window !== "undefined" ? localStorage.getItem("authToken") : "";
}

export function setLocalStorageToken(data) {
  return typeof window !== "undefined"
    ? localStorage.setItem("authToken", data)
    : "";
}

export default { getLocalStorageToken, setLocalStorageToken };
