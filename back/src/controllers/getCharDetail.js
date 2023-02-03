const axios = require("axios");

const getCharDetail = (res, id) => {
    axios(`https://rickandmortyapi.com/api/character/${id}`)
        .then(response => response.data)
        .then(data => {
            let character = {
                id: data.id,
                image: data.image,
                name: data.name,
                gender: data.gender,
                status: data.status,
                origin: data.origin.name,
                species: data.species,
            }
            res
                .writeHead(200, { "Content-Type": "application/json" })
                .end(JSON.stringify(character));
        })
        .catch(error => {
            res
                .writeHead(500, { "Content-Type": "text/plain" })
                .end(error.message = `Character with id: ${id} not found`)
        })
}

module.exports = getCharDetail 