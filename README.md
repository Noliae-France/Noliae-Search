# Noliae Search

Frontend public de recherche pour `noliae.com` et `www.noliae.com`. Le site est
statique, sans Node.js, et respecte la charte Pulse de Noliae : Encre, Vermillon,
Plâtre et Blanc cassé.

Il appelle le [NolCore API](https://github.com/Noliae-France/NolCore-API) via
`NOLIAE_API_BASE` et utilise les routes `/v1/search/*`.

```sh
docker build -t noliae-search .
docker run --rm -p 8081:8080 -e NOLIAE_API_BASE=https://api.noliae.com noliae-search
```

Le déploiement DNS de `noliae.com` et `www.noliae.com` est volontairement
externe au dépôt. La CI construit l’image GHCR et vérifie le site avec Nginx.
