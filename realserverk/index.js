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
    router.get('/user/:user_id', AuthController.index)

    //todos API
    router.get('/webtoons', ToonsController.index)    
    router.get('/webtoon/:id', ToonsController.show)    
    router.post('/webtoon', authenticated,ToonsController.store)    
    router.patch('/webtoon/:id', authenticated,ToonsController.update)    
    router.delete('/webtoon/:id', authenticated,ToonsController.delete)
    //another APIs goes here
    //episode API
    router.get('/webtoon/:toonID/episodes', authenticated,EpisodeController.index)    
    //pages API
    router.get('/webtoon/:toonID/episode/:epsID', authenticated,PagesController.index)
    //my webtoon API
    router.get('/user/:user_id/webtoons', authenticated,ToonsController.userwebtoons)

    //create my webtoon webtoon implementation
    router.post('/user/:user_id/webtoon', authenticated,ToonsController.store)
    //update detail my webtoon
    router.put('/user/:user_id/webtoon/:webtoonid', authenticated,ToonsController.update)
    //delete webtoon based on user id and webtoon id
    router.delete('/user/:user_id/webtoon/:webtoonid', authenticated,ToonsController.delete)
    //get episodes based on weebtoon id 
    router.get('/user/:user_id/webtoon/:webtoonid/episodes', authenticated,EpisodeController.index)
    //create my episodes implementation
    router.post('/user/:user_id/webtoon/:webtoonid/episodes', authenticated,EpisodeController.store)
    //get all image based on created episodes
    router.get('/user/:user_id/webtoon/:webtoonid/episodes/:episodeid/images', authenticated,PagesController.index)
    //update my episodes
    router.put('/user/:user_id/webtoon/:webtoonid/episodes/:episodeid', authenticated,PagesController.update)
    //create image for episode implementation
    router.post('/user/:user_id/webtoon/:webtoonid/episode/:episodeid/image', authenticated,PagesController.store)
    //delete episodes
    router.delete('/user/:user_id/webtoon/:webtoonid/episodes/:episodeid', authenticated,EpisodeController.delete)
    //delete pages
    router.delete('/user/:user_id/webtoon/:webtoonid/episodes/:episodeid/image/:imageid', authenticated,PagesController.delete)
})


app.listen(port, () => console.log(`Listening on port ${port}!`))