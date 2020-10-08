const t = {
  token: null,
  id: null,
};

export function getCreds() {
  return t;
}
export function setCreds(id, token) {
  t.id = id;
  t.token = token;
}
