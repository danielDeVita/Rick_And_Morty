//cmnd k c y cmnd k u

// const http = require("http");
// const PORT = 3001;
// const characters = require("../utils/data");
// const getCharById = require("../controllers/getCharById");
// const getCharDetail = require("../controllers/getCharDetail");

// http.createServer((req, res) => {
//     console.log(`server up on port ${PORT}`);
//     res.setHeader('Access-Control-Allow-Origin', '*'); //permite hacer peticiones al backEnd
//     let id = req.url.split("/").at(-1);

//     //INTEGRATION WEB SERVER (no va mas)
//     /* if (req.url.includes("rickandmorty/character")) {
//         let id = req.url.split("/").at(-1)
//         let character = characters.find(character => character.id === Number(id))
//         res.writeHead(200, { "Content-Type": "application/json" }).end(JSON.stringify(character))
//     }; */

//     //INTEGRATION PROMISES
//     if (req.url.includes("onsearch")) getCharById(res, id);
//     if (req.url.includes("detail")) getCharDetail(res, id);

//     return
// }).listen(PORT, "localhost");