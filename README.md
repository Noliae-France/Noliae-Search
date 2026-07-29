# Noliae Search

Interface MVC de `noliae.com` et `www.noliae.com`, construite en **Nolc** avec
des vues serveur `.nhtml`. Elle respecte la charte Pulse de Noliae et reste
distincte du [NolCore](https://github.com/Noliae-France/NolCore).

```text
main.nol          contrôleurs et routeur MVC
views/search.nhtml vue serveur transpilée par nolc nhtml
static/noliae.css charte graphique Noliae
```

```sh
nolc nhtml views/search.nhtml
nolc check main.nol
docker build -t noliae-search .
docker run --rm -p 8080:8080 noliae-search
```

Le site expose `/`, `/recherche?q=…` et `/api/health`. Le déploiement DNS de
`noliae.com` et `www.noliae.com` est à effectuer dans l’infrastructure domaine ;
`deploy/k8s.yaml` contient le Deployment, Service et les deux règles Ingress.
La CI compile les `.nhtml`, construit le binaire Nolc, smoke-teste les routes et
publie l’image GHCR.
