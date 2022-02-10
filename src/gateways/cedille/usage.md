# Authentification

L'authentification est faite avec un Bearer token:
https://swagger.io/docs/specification/authentication/bearer-authentication/

```
Authorization: Bearer <token>
```

Vous pouvez trouver la documentation de l'API ici :
https://api-prd.cedille.ai/docs

Pour utiliser le modèle français actuel (Boris), utilisez ce endpoint :
`/v1/engines/fr-boris/completions`

L'API de Cedille est actuellement en beta et ne doit pas être utilisée pour des applications en production. Nous fournissons ce service sur une base de "best effort": la disponibilité et la performance du système ne peuvent pour l'instant pas être garanties.

Il n'y a actuellement pas de limite explicite d'utilisations pour les utilisateurs avec une clé d’API. Nous comptons toutefois sur le fair-play de chacun!

# Utilisation de l'API

Le payload de l'API `/v1/engines/fr-boris/completions` :

```
{
  "prompt": "<|endoftext|>",
  "max_length": 32,
  "temperature": 1,
  "top_p": 0.8,
  "top_k": 50,
  "repetition_penalty": 1.1,
  "n": 1
}
```

Essai avec cUrl :

```
curl -X POST https://api-prd.cedille.ai/v1/engines/fr-boris/completions \
   -H 'Content-Type: application/json' \
   -H "Authorization: Bearer xxxxxxxxx" \
   -d '{"prompt": "Dans ma boutique, je vends des produits cosmétiques bio pour les femmes qui veulent prendre soin de leur corps natuellement. Ma boutique s appelle ","max_length": 12,"temperature": 1,"top_p": 0.8,"top_k": 50,"repetition_penalty": 1.1,"n": 1}'

```
