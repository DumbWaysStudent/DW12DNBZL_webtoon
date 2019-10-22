const express = require('express')
const bodyParser = require('body-parser')
require('express-group-routes')
const multer  = require('multer'); 


const app = express()
const port = 5000



const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './public/img/')
    },
    filename : function(req,file,cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
})

const fileFilter = (req,file,cb)=> {
    //reject file
    if(file.mimetype ==='image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true)
    }else {
        cb(null,false)
    }
}

const upload = multer({storage : storage,limits:{
    fileSize : 2048 * 2048 * 5
}, 
fileFilter : fileFilter
})

//controllers
const AuthController = require('./controllers/Auth')
const ToonsController = require('./controllers/toons')
const EpisodeController = require('./controllers/episodes')
const PagesController = require('./controllers/pages')

app.use(bodyParser.json())

app.use('/public',express.static('public'));
const { authenticated } = require('./middleware')

app.group("/api/v1", (router) => {

    router.post('/login', AuthController.login)
    router.post('/register', AuthController.register)
    router.get('/user/:user_id', AuthController.index)
    router.put('/user/:user_id',upload.single('image') ,AuthController.update)

    //todos API
    router.get('/webtoons', ToonsController.index)  
    router.get('/user/:user_id/favorites', ToonsController.fav)  
    router.get('/webtoon/:user_id', ToonsController.userwebtoons)    
    router.post('/webtoon', authenticated,ToonsController.store)    
    router.patch('/webtoon/:id', authenticated,ToonsController.update)    
    router.delete('/webtoon/:id', authenticated,ToonsController.delete)
    //another APIs goes here
    //episode API
    router.get('/webtoon/:toonID/episodes', EpisodeController.index)    
    //pages API
    router.get('/webtoon/:toonID/episode/:epsID', PagesController.index)
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