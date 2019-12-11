const express = require("express");
const cors = require("cors");
const knex = require("knex");
const dbConfig = require("./knexfile");
const db = knex(dbConfig.development);

const server = express();

server.use(express.json());

const PORT = 8080;

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});