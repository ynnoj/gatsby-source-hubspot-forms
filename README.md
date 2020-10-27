# gatsby-source-hubspot-forms

Gatsby source plugin for [HubSpot](https://hubspot.com) form data

> This project is a fork of [`gatsby-source-hubspot-forms`](https://github.com/jamaljeantobias/gatsby-source-hubspot-forms) by [Jamal Jean-Tobias](https://github.com/jamaljeantobias)

## Install

```sh
yarn add @ynnoj/gatsby-source-hubspot-forms
```

## How to use

```js
// In your gatsby-config.js
plugins: [
  {
    resolve: `@ynnoj/gatsby-source-hubspot-forms`,
    options: {
      apiKey: '...',
    },
  },
],
```