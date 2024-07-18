export function getLocalStorageToken() {
  return typeof window !== "undefined"
    ? localStorage.getItem("authToken")
    : null;
}

export function setLocalStorageToken(data) {
  return typeof window !== "undefined"
    ? localStorage.setItem("authToken", data)
    : null;
}

export default { getLocalStorageToken, setLocalStorageToken };
