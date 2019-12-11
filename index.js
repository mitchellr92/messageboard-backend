const express = require("express");
const cors = require("cors");
const knex = require("knex");
const dbConfig = require("./knexfile");
const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {

})

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});