# base-restify-api
Simple API base in node/restify

## What am I?
Almost the simplest API base I could make. Used the (very readable) example from https://medium.com/getstream-io/in-depth-guide-on-building-a-rest-api-with-node-js-restify-mongodb-2c9495d6225f as a starter.

I've made a few modifications and tidied it up in a few places to use as a quick base for building/testing rest APIs. There are 2 apis included

- /cats
- /dogs

the /cats route is coded in the routes/specific.js as an example of coding in a route. /dogs is how I might add a route dynamically just by adding a model for the required object (it's not scanning the file system yet though).

it's expecting to store data back to a MongoDB - the default is one running localy on the standard Mongo port. It'll create a collection with the project name.
