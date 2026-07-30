(() => {
  const host = location.hostname.split(".");
  const app = name => host.length >= 3 ? `${location.protocol}//${name}.${host.slice(1).join(".")}` : "/";
  document.querySelectorAll("a[href='/'],a[href='/compte']").forEach(link => {
    const label = link.textContent.trim().toLowerCase();
    let target = "";
    if (label.includes("créer un compte")) target = "register";
    else if (label.includes("se connecter") || label === "connexion") target = "login";
    else if (label.startsWith("compte")) target = "account";
    else if (label.includes("noliae ia") || label === "ia") target = "ia";
    else if (label.includes("noliae search") || label === "search" || label.includes("recherche noliae")) target = "search";
    if (target) link.href = app(target);
  });
})();
