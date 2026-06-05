// Central place for all backend API calls.
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function request(path, { method = "GET", body, token } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

export const api = {
  register: (body) => request("/api/auth/register", { method: "POST", body }),
  login: (body) => request("/api/auth/login", { method: "POST", body }),
  me: (token) => request("/api/auth/me", { token }),
  getNotes: (token) => request("/api/notes", { token }),
  createNote: (body, token) =>
    request("/api/notes", { method: "POST", body, token }),
  deleteNote: (id, token) =>
    request(`/api/notes/${id}`, { method: "DELETE", token }),
};
