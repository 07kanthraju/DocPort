const API_URL = "http://localhost:8080";

export const getUsers = async () => {
  const res = await fetch(`${API_URL}/users`);
  return res.json();
};
