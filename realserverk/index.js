const express = require('express')
const bodyParser = require('body-parser')
require('express-group-routes')

const app = express()
const port = 5000

//controllers
const AuthController = require('./controllers/Auth')
const ToonsController = require('./controllers/toons')
const EpisodeController = require('./controllers/episodes')
const PagesController = require('./controllers/pages')
app.use(bodyParser.json())


const { authenticated } = require('./middleware')

app.group("/api/v1", (router) => {

    router.post('/login', AuthController.login)

    //todos API
    router.get('/toons', ToonsController.index)    
    router.get('/toon/:id', ToonsController.show)    
    router.post('/toon', authenticated,ToonsController.store)    
    router.patch('/toon/:id', authenticated,ToonsController.update)    
    router.delete('/toon/:id', authenticated,ToonsController.delete)
    //another APIs goes here
    //episode API
    router.get('/toon/:toonID/episodes', EpisodeController.index)    
    //pages API
    router.get('/toon/:toonID/episode/:epsID', PagesController.index)
})


app.listen(port, () => console.log(`Listening on port ${port}!`))