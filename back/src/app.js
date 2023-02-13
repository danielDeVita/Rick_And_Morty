const express = require("express");
const app = express();
const axios = require("axios")
const cors = require("cors");
const PORT = 3001;
const { saveApiData } = require('./controllers/saveApiData')
const { sequelize } = require('./DB_connection')
const getAllChars = require('./controllers/getAllChars');
const postFav = require("./controllers/postFav");
const getAllFavorites = require('./controllers/getAllFavorites');
const deleteFavoriteById = require("./controllers/deleteFavoriteById");
//app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
//app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json())
app.use(cors()); //para permitir acceso de afuera a nuestra api y no hacer:
//res.setHeader("Access-Control-Allow-Origin", "*") dentro de cada ruta

// let fav = []; //no puede ser const pq vamos a modificarlo (deprecated with sequelize)

app.get('/rickandmorty/allCharacters', async (req, res) => {
    try {
        const allCharacters = await getAllChars();
        res.status(200).json(allCharacters);
    } catch (error) {
        res.status(404).send('Hubo un problema');
    }
});

app.get("/rickandmorty/character/:id", async (req, res) => { //o sin async si es con promesas .then
    let { id } = req.params;
    try {
        const response = await axios(`https://rickandmortyapi.com/api/character/${id}`);
        const data = response.data;
        let character = {
            id: data.id,
            name: data.name,
            image: data.image,
            species: data.species,
            gender: data.gender,
        }
        return res.status(200).json(character)
    } catch (error) {
        console.error(error)
        //return res.status(500).json({ error: `Character with id: ${id} not found` })
        res.status(404).send(error.message)
    }
    /*  axios(`https://rickandmortyapi.com/api/character/${id}`)
         .then(response => response.data)
         .then(data => {
             let character = {
                 id: data.id,
                 name: data.name,
                 image: data.image,
                 species: data.species,
                 gender: data.gender,
             }
             return res.status(200).json(character)
         })
         .catch(error => {
             console.error(error)
             return res.status(500).json({ error: `Character with id: ${id} not found` })
         }) */
});

app.get("/rickandmorty/detail/:id", async (req, res) => {
    let { id } = req.params;
    try {
        const response = await axios(`https://rickandmortyapi.com/api/character/${id}`);
        const data = response.data;
        let character = {
            id: data.id,
            name: data.name,
            status: data.status,
            species: data.species,
            gender: data.gender,
            origin: data.origin.name,
            image: data.image,
        }
        return res.status(200).json(character)
    } catch (error) {
        console.error(error)
        //return res.status(500).json({ error: `Character with id: ${id} not found` })
        res.status(404).send(error.message)
    }
    /*  axios(`https://rickandmortyapi.com/api/character/${id}`)
         .then(response => response.data)
         .then(data => {
             let character = {
                 id: data.id,
                 name: data.name,
                 status: data.status,
                 species: data.species,
                 gender: data.gender,
                 origin: data.origin.name,
                 image: data.image,
             }
             return res.status(200).json(character)
         })
         .catch(error => {
             console.error(error)
             return res.status(500).json({ error: `Character with id: ${id} not found` })
         }) */
})

app.get("/rickandmorty/fav", async (req, res) => {
    /////////////////////////////////// DEPRECATED
    /* return res.status(200).json(fav) */
    /////////////////////////////////// USE THIS:
    try {
        const allFavorites = await getAllFavorites();
        if (allFavorites.error) throw new Error(allFavorites.error)
        return res.status(200).json(allFavorites);
    } catch (error) {
        return res.status(404).send(error)
    }
});

app.post("/rickandmorty/fav", async (req, res) => {

    /////////////////////////////////// DEPRECATED
    /* let { id, name, status, species, gender, origin, image } = req.body;
    let character = { id, name, status, species, gender, origin, image };
    fav.push(character); */
    /* fav.push(req.body);
    res.status(200).send("Se guardaron los datos correctamente"); */
    //return res.status(200).json({ success: true })
    /////////////////////////////////// USE THIS:
    try {
        const characterFav = await postFav(req.body);
        if (characterFav.error) throw new Error(characterFav.error);
        return res.status(200).json(characterFav);
    } catch (error) {
        return res.status(404).send(error)
    }
});



app.delete("/rickandmorty/fav/:id", async (req, res) => {
    /////////////////////////////////// DEPRECATED
    /*  let { id } = req.params; 
     let restOfCharacters = fav.filter(character => character.id !== Number(id))
     fav = restOfCharacters;
     res.status(200).send("Personaje eliminado") */
    //return res.status(200).json({ success: true })
    /////////////////////////////////// USE THIS:
    try {
        const deleteFavorite = await deleteFavoriteById(parseInt(req.params.id));
        if (deleteFavorite.error) throw new Error(deleteFavorite.error)
        return res.status(200).send(deleteFavorite);
    } catch (error) {
        return res.status(404).send(error)
    }
});

sequelize.sync({ force: true }).then(async () => {
    console.log('DB connected')
    await saveApiData();
    app.listen(PORT, () => {
        console.log(`server up on ${PORT}`)
    })
})

//module.exports = app lo tuve que sacar