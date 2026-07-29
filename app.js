const config = window.NOLIAE_CONFIG || { apiBase: "" };
const form = document.querySelector("#search-form");
const input = document.querySelector("#query");
const results = document.querySelector("#results");
const meta = document.querySelector("#meta");
let mode = "text";

document.querySelectorAll(".mode").forEach((button) => button.addEventListener("click", () => {
  document.querySelector(".mode.active").classList.remove("active");
  button.classList.add("active"); mode = button.dataset.mode;
}));
document.querySelector("#theme").addEventListener("click", () => document.body.classList.toggle("dark"));

function escapeHtml(value) { const node = document.createElement("span"); node.textContent = String(value || ""); return node.innerHTML; }
function render(items) { results.innerHTML = items.map((item) => `<article class="result"><small>${escapeHtml(item.type || mode)}</small><h2>${escapeHtml(item.title || item.url || "Résultat Noliae")}</h2><p>${escapeHtml(item.content || item.result || item.description || "Aucun extrait disponible.")}</p></article>`).join(""); }

form.addEventListener("submit", async (event) => {
  event.preventDefault(); const query = input.value.trim(); if (!query) return;
  meta.textContent = "Recherche en cours…"; results.innerHTML = "";
  try {
    const endpoint = `${config.apiBase}/v1/search/${mode}/${encodeURIComponent(query)}`;
    const response = await fetch(endpoint, { credentials: "include" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json(); const items = Array.isArray(payload) ? payload : (payload.results || [payload]);
    meta.textContent = `${items.length} résultat${items.length > 1 ? "s" : ""} pour « ${query} »`;
    render(items);
  } catch (error) {
    meta.textContent = "Recherche indisponible";
    results.innerHTML = `<p class="notice">Le Core Noliae ne répond pas encore. Vérifiez <code>NOLIAE_API_BASE</code>, la CORS et votre session.</p>`;
  }
});
