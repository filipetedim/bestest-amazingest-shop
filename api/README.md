# NodeJS API

## Table of Contents

* [Install](#install)
* [Run](#run)
* [Testing](#testing)
* [Database](#database)
* [Development](#development)
* [Documentation](#documentation)
* [Issues](#issues)

## Install

* Database is hosted under MongoDB Atlas service, [explanation below](#Database)
* Move to api folder with `cd api`
* Install dependencies with `npm install`

## Run

* Move to api folder with `cd api`
* Run nodemon with `npm run dev`

## Testing

Endpoint tests are done by Mocha together with Chai/Chai-http. All validations are being tested. Testing happens in a different database cluster in MongoDB Atlas.

* Move to api folder with `cd api`
* Run mocha with `npm run test`
* Currently 60 tests were created

_May have gone overboard with tests_, but since it was lacking in my current repertoire, thought it was worth being thorough to get used to them.
![Should be asleep](https://i.imgur.com/ht8HWkO.png)

## Database

Decided to use a cloud service instead of a local instance to avoid issues when installing in different Operating Systems.

MongoDB Atlas has a free forever tier sandbox that fits perfectly.

## Development

* Prettier runs on pre-commit

## Documentation

The structure is quite self-explanatory. Controllers/Models/Middlewares/Routes/Tests.

## Issues

Mocha currently has a vulnerability in its latest 6.0.2 build (depends on js-yaml which has a moderate level DoS vulnerability).

In production, I would have downgraded to the last stable (v5.x) but for the sake of checking what's new on 6.x plus being just an exercise, decided not to.
