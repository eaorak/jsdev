import "whatwg-fetch";
import baseUrl from "./baseUrl";

const base = baseUrl();

export function getUsers() {
  return get("users");
}

export function deleteUser(id) {
  return del(`users/${id}`);
}

function get(url) {
  return fetch(base + url).then(onSuccess, onError);
}

function del(url) {
  const request = new Request(base + url, {
    method: "DELETE"
  });
  return fetch(request).then(onSuccess, onError);
}

function onSuccess(response) {
  return response.json();
}

function onError(error) {
  console.log(error); // eslint-disable-line no-console
}
