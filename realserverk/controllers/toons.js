const models = require('../models')
const Toons = models.toons
const User = models.user
const UserFav = models.userfav
const Sequelize = require('sequelize')

exports.index = (req, res) => {
    let query
    const Op = Sequelize.Op;
    if(req.query.title){
        query = Toons.findAll({
            where : {
                tittle: {
                    [Op.like] : '%' + req.query.title  + '%'
                }
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
                isFavorite : true 
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

exports.fav = (req,res) => {
    let favquerry
    favquerry = User.findOne({
        where : {
            id : req.params.user_id
        },
        include : [{
            model : Toons,
            as : 'toons',
            required: false,
            attributes : ['id','tittle','image'],
            through : {
                model : UserFav,
                as : 'userfav',
                
            }
        }]
    })
    favquerry.then(toon=>res.send({
        data : toon.toons
    })
)
}

exports.favstore=(req,res) => {
    const favdata={
        user_id : req.params.user_id,
        toon_id : req.params.toon_id
    }
    UserFav.create(favdata).then(fav=>{
        res.send({
            message:"succeess",
            fav
        })
    })
}

exports.favdelete=(req,res) =>{
   
    UserFav.destroy({
        where : {
            user_id : req.params.user_id,
            toon_id : req.params.toon_id
        }
    }).then(toon=>{
        res.send({
            message : "success delete",
            toon
        })
    })
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