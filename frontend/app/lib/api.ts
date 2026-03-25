const API_URL = "http://localhost:8080/api";

export async function getData(endpoint: string) {
  const res = await fetch(`${API_URL}${endpoint}`);
  return res.json();
}

export async function postData(endpoint: string, data: any) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  return res.json();
}

export async function putData(endpoint: string, data: any) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  return res.json();
}