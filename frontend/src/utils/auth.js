export const BASE_URL = 'https://api.pushkina.nomorepartiesxyz.ru';

const getResponseData = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

const headers = {
  "Content-Type": "application/json",
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: 'include',
    headers,
    body: JSON.stringify({ email, password }),
  }).then((response) => getResponseData(response));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: 'include',
    headers,
    body: JSON.stringify({ email, password }),
  }).then((response) => getResponseData(response));
};

export const logout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: "POST",
    credentials: 'include',
    headers,
  }).then((response) => getResponseData(response));
};

// export const checkToken = (token) => {
//   return fetch(`${BASE_URL}/users/me`, {
//     method: "GET",
//     headers: {
//       ...headers,
//       authorization: `Bearer ${token}`,
//     },
//   }).then((response) => getResponseData(response));
// };
