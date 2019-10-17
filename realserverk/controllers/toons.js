const models = require('../models')
const Toons = models.toons
const User = models.user


exports.index = (req, res) => {
    let query
    if(req.query.title){
        query = Toons.findAll({
            where : {
                tittle : req.query.title 
            },
            include: [{
                model: User,
                as: "createdBy"
            }]
        })
    }else if (req.params.user_id){
        query = Toons.findAll({
            where : {
                created_By : req.params.user_id 
            },
            include: [{
                model: User,
                as: "createdBy"
            }]
        })
    }
    else{
    query = Toons.findAll({
        include: [{
            model: User,
            as: "createdBy"
        }]
    })}
    query.then(toon=>res.send(toon))
}

exports.isfavorite=(req,res) =>{
    let favquery
    if (req.query.fav){
        favquery = Toons.findAll({
            where : {
                isFavorite : req.query.fav 
            },
            include: [{
                model: User,
                as: "createdBy"
            }]
        })
    }
favquery.then(fav=>res.send(fav))
}

exports.userwebtoons= (req,res) =>{
    let userwebtoonq
    userwebtoonq = Toons.findAll({
        where : {
            created_By : req.params.user_id 
        },
        include: [{
            model: User,
            as: "createdBy"
        }]
    })
    userwebtoonq.then(toon=>res.send(toon))
}


exports.show = (req, res) => {
    Toons.findOne({id: req.params.id}).then(toon=> res.send(toon))
}

exports.store = (req, res) => {
    const data ={
        tittle : req.body.title,
        genre : req.body.genre,
        isFavorite : false,
        image :req.body.image,
        created_By : req.params.user_id
    }
    Toons.create(data).then(toon=> {
        res.send({
            message: "success",
            toon
        })
    })
}

exports.update = (req, res) => {
    const data ={
        tittle : req.body.title,
        genre : req.body.genre,
        isFavorite : false,
        image : req.body.image
    }
    Toons.update(
        data,
        {where: {id: req.params.webtoonid,
                created_By:req.params.user_id}}
    ).then(toon=> {
        res.send({
            message: "success",
            data
        })
    })
}

exports.delete = (req, res) => {
    Toons.destroy({where: {id: req.params.webtoonid,
        created_By:req.params.user_id}}).then(toon=> {
        res.send({
            message: "successss",
            toon
        })
    })
}