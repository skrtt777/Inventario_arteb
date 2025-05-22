const API_BASE = 'http://192.168.0.188/api.php';

export async function getItens() {
  const res = await fetch(`${API_BASE}/itens`);
  return res.json();
}

export async function addItem(data) {
  const res = await fetch(`${API_BASE}/itens`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateItem(id, data) {
  const res = await fetch(`${API_BASE}/itens/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteItem(id) {
  const res = await fetch(`${API_BASE}/itens/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}
