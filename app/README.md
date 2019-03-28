# Bestest Amazingest Shop API

## Table of Contents

* [Install](#install)
* [Run](#run)
* [Development](#development)
* [Documentation](#documentation)

## Install

* Move to app folder with `cd app`
* Install dependencies with `npm install`

## Run

* Move to app folder with `cd app`
* Run React with `npm start`
* Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Development

* Prettier runs on pre-commit

## Documentation

The `src/` folder structure is sub-divided as below, with the notable files explained.

```md
|-- components/               Pure components for re-usability
|-- containers/               React.Components that use state management
|-- screens/                  Route pages
|-- services/                 All the API services exposed
|-- stores/                   Holds only the Cart store which controls the cart
|-- utils/
|    |-- config.js            Holds configurations
|    |-- currencyParser.js    Currency controller to manage localization and parsing of prices
|    |-- extraData.js         Images for each ID
|    |-- history.js
```