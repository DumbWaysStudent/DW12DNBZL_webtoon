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
    router.post('/register', AuthController.register)

    //todos API
    router.get('/webtoons', ToonsController.index)    
    router.get('/webtoon/:id', ToonsController.show)    
    router.post('/webtoon', authenticated,ToonsController.store)    
    router.patch('/webtoon/:id', authenticated,ToonsController.update)    
    router.delete('/webtoon/:id', authenticated,ToonsController.delete)
    //another APIs goes here
    //episode API
    router.get('/webtoon/:toonID/episodes', EpisodeController.index)    
    //pages API
    router.get('/webtoon/:toonID/episode/:epsID', PagesController.index)
    //my webtoon API
    router.get('/user/:user_id/webtoons', ToonsController.index)
    //create my webtoon webtoon implementation
    router.post('/user/:user_id/webtoon', ToonsController.store)
    router.get('/user/:user_id/webtoon/:webtoonid/episodes', EpisodeController.index)
    //
})


app.listen(port, () => console.log(`Listening on port ${port}!`))