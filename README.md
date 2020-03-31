# KVS

## App Running on Heroku

[Key Value Heroku](http://kvs-monks.herokuapp.com/)

## Clone Project from Github

`git clone https://github.com/amilcarcattaneo/kvs-node.git`

`cd kvs-node`

## Install Dependencies

    1. `npm install`

## Start Server

`npm run dev`

## API REST

If you have Postman installed, inside the project you'll find a Postman collection with the requests.

    * GET 'http://localhost:8000/key/test'
    	header 'Content-Type: application/json'
    * Status Code:
    	1. **200**: if the key has a value.
    	2. **400**: if the key param is undefined or contains only white spaces.
    	3. **404**: if the key doesn’t have a value.

```
curl --location --request GET 'http://localhost:8000/key/test' \
--header 'Content-Type: application/json'
```

    * POST 'http://localhost:8000/key'
    	header 'Content-Type: application/json'
    * Status Code:
    	1. **201**: if the key value pair was accepted.
    	2. **400**: if the key or the value are undefined or contains only white spaces.

```
curl --location --request POST 'http://localhost:8000/key' \
--header 'Content-Type: application/json' \
--data-raw '{
	"key": "test",
	"value": "test"
}'
```

## Main Dependencies

    * NodeJS: [Node.js · GitHub](https://github.com/nodejs)
    * Express for routing and start a server: [GitHub - expressjs/express: Fast, unopinionated, minimalist web framework for node.](https://github.com/expressjs/express)
    * Mongoose to handle MongoDB: [GitHub - Automattic/mongoose: MongoDB object modeling designed to work in an asynchronous environment.](https://github.com/Automattic/mongoose)
    * NextJS: [NextJS · GitHub](https://github.com/zeit/next.js)

## TODO

- [ ] Web
