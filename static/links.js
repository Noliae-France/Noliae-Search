(() => {
  const labels = { search: "search", ia: "ia", login: "login", register: "register", account: "account" };
  const parts = location.hostname.split(".");
  const local = parts.length < 3;
  const derived = name => local ? "/" : `${location.protocol}//${name}.${parts.slice(1).join(".")}`;
  const apply = config => {
    document.querySelectorAll("[data-app]").forEach(link => {
      const name = link.dataset.app;
      const configured = config && config[`${name}_url`];
      link.href = configured || derived(labels[name]);
    });
    const name = config && config.name;
    if (name && name !== "NolCore") document.querySelectorAll("[data-brand]").forEach(node => node.textContent = name);
  };
  apply(null);
  const api = local ? location.origin : `${location.protocol}//api.${parts.slice(1).join(".")}`;
  fetch(`${api}/v1/branding`, { credentials: "include" }).then(r => r.ok ? r.json() : null).then(apply).catch(() => {});
})();
