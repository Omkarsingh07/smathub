const API_URL = "http://127.0.0.1:8000"; // FastAPI local URL

export async function registerUser(username, email, password) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
  companyName: formData.companyName,
  email: formData.email,
  password: formData.password,
  agreeToTerms: formData.agreeToTerms
})
  });

  if (!res.ok) throw new Error((await res.json()).detail || "Registration failed");
  return res.json();
}

export async function loginUser(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) throw new Error((await res.json()).detail || "Login failed");
  return res.json();
}
