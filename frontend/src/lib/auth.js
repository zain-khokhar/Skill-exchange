export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

const POST_LOGIN_REDIRECT_KEY = "postLoginRedirect";
const POST_LOGIN_REDIRECT_TOKEN_KEY = "postLoginRedirectToken";

function getRedirectStorage() {
  if (typeof window === "undefined") return null;
  return window.sessionStorage;
}

export function getUser() {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function isAuthenticated() {
  return !!getToken();
}

export function isAdmin() {
  const user = getUser();
  return user?.isAdmin === true;
}

export function savePostLoginRedirect(path) {
  const storage = getRedirectStorage();
  if (!storage || !path) return null;

  const token = typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `redirect-${Date.now()}`;

  storage.setItem(POST_LOGIN_REDIRECT_KEY, path);
  storage.setItem(POST_LOGIN_REDIRECT_TOKEN_KEY, token);
  return token;
}

export function consumePostLoginRedirect() {
  const storage = getRedirectStorage();
  if (!storage) {
    return { path: null, token: null };
  }

  const path = storage.getItem(POST_LOGIN_REDIRECT_KEY);
  const token = storage.getItem(POST_LOGIN_REDIRECT_TOKEN_KEY);

  storage.removeItem(POST_LOGIN_REDIRECT_KEY);
  storage.removeItem(POST_LOGIN_REDIRECT_TOKEN_KEY);

  return { path, token };
}
