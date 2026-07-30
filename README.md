<div align="center">

# Noliae Search

### L’interface de recherche de Noliae, en Nolc MVC

[![CI](https://github.com/Noliae-France/Noliae-Search/actions/workflows/ci.yml/badge.svg)](https://github.com/Noliae-France/Noliae-Search/actions/workflows/ci.yml)
[![Container](https://github.com/Noliae-France/Noliae-Search/actions/workflows/container.yml/badge.svg)](https://github.com/Noliae-France/Noliae-Search/actions/workflows/container.yml)
[![Runtime](https://img.shields.io/badge/runtime-Nolc-FF4D2E)](https://github.com/Noliae-France/nolc)

</div>

Noliae Search est l’application servie sur **`noliae.com`** et
**`www.noliae.com`**. Ce n’est pas une SPA Node ou une maquette statique : le
routeur, les contrôleurs et le rendu serveur sont écrits en Nolc ; les vues sont
des fichiers `.nhtml` compilés de manière native.

## Design Noliae Pulse

L’interface reprend le langage visuel Noliae : topbar en Encre, waveform,
Vermillon comme signal actif, surfaces Plâtre et fond Blanc cassé. La vue reste
rapide, accessible et responsive, avec une recherche en premier plan.

## Architecture MVC

```text
main.nol                 Routeur HTTP, contrôleurs et santé
views/search.nhtml       Vue serveur source
views/search.nol         Vue Nolc générée et versionnée
static/noliae.css        Charte et comportement responsive
vendor/nolc/lib/         Bibliothèque Nolc nécessaire au build autonome
```

| Route | Rôle |
|---|---|
| `GET /` | Page de recherche Noliae |
| `GET /recherche?q=&mode=` | Vue de résultats et contrat vers NolCore Search |
| `GET /api/health` | Probe Docker/Kubernetes |

Le contrôleur de recherche est le point de raccordement vers
[NolCore](https://github.com/Noliae-France/NolCore) et ses routes
`/v1/search/text`, `/img` et `/ia`. Les permissions, sessions et limites de
débit restent gérées par le Core.

Le premier passage peut être complété par Brave Search côté Core, puis les URL
sont placées dans la file du crawler et les recherches suivantes utilisent
l’index PostgreSQL. La clé Brave reste exclusivement côté serveur.

## Développement

Prérequis : le binaire `nolc` et, pour l’image, Docker.

```sh
nolc nhtml views/search.nhtml
nolc check main.nol
nolc build main.nol -o noliae-search --lien ssl --lien crypto
NOLIAE_PORT=8080 ./noliae-search
```

Ouvrir ensuite `http://localhost:8080`.

## Docker et Kubernetes

```sh
docker build -t noliae-search .
docker run --rm -p 8080:8080 noliae-search
kubectl apply -f deploy/k8s.yaml
```

`deploy/k8s.yaml` fournit deux réplicas, un Service et les règles Ingress pour
`noliae.com` et `www.noliae.com`. Le pointage DNS et les certificats TLS restent
à configurer dans l’infrastructure qui possède le domaine.

## Navigation multi-domaines

Les liens vers Account, IA, Login et Register sont dérivés du hostname courant.
Ainsi `search.beta.noliae.com` dirige vers `account.beta.noliae.com`, tandis
que la production garde les sous-domaines de production. Aucun lien `/compte`
local n’est utilisé.

## CI/CD

Chaque push compile les vues dans l’image Ubuntu/Nolc, construit le binaire,
smoke-teste `/`, `/recherche` et `/api/health`, puis publie
`ghcr.io/noliae-france/noliae-search:main`. Le dépôt
[NolCore](https://github.com/Noliae-France/NolCore) exécute également un test
d’intégration qui récupère et démarre ce frontend avec Noliae IA.

## Licence

Distribué sous [licence MIT](LICENSE).
