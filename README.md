# Remix e-commerce playground

- [Remix Docs](https://remix.run/docs)

## Structure

This simple e-commerce web site intends to explain how to organize a mono-repo to separate the core business logic from the UI.

```
src-|
    |- app      -> the Remix web app
    |- domain   -> the core business
    |- gateways -> the adapters to DB, email service, ...
    |- infra    -> Dockerfile and nginx config
```

## Installation

From your terminal:

```
yarn
```

## Tests

```
yarn test
```

## Development

```sh
yarn dev
```

This starts your app in development mode, rebuilding assets on file changes.
