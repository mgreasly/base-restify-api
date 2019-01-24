# sample-api
Simple API base in node/restify

## What am I?
Almost the simplest API base I could make. Used the (very readable) example from https://medium.com/getstream-io/in-depth-guide-on-building-a-rest-api-with-node-js-restify-mongodb-2c9495d6225f as a starter.

I've made a few modifications and tidied it up in a few places to use as a quick base for building/testing rest APIs. It has a single model (Todo) and a single route (/todo) to copy from.

it's expecting to store data back to a MongoDB - the default is one running localy on the standard Mongo port. It'll create a collection with the project name.
