const models = require('../models')
const Toons = models.toons
const Episodes = models.episodes
const User = models.user


exports.index = (req, res) => {
    let query
    if ((req.params.user_id)&&(req.params.webtoonid)){
        query = Episodes.findAll({
            where : {
                toons_id : req.params.webtoonid
            },
            include: [{
                model: Toons,
                as: "toonsid",
                where : {
                    created_By : req.params.user_id
                },
                include : [{                   
                model: User,
                as: "createdBy"
                }]
            }]
        })
    }else{
    query = Episodes.findAll({
        where : {
            toons_id : req.params.toonID
        },
        include: [{
            model: Toons,
            as: "toonsid"
        }]
    })
}
    console.log(req.params.user_id, req.params.webtoonid)
    query.then(toons=>res.send(toons))
}

exports.store = (req, res) => {
    const data ={
        title : req.body.title,
        image :req.body.image,
        toons_id : req.params.webtoonid
    }
    Episodes.create(data).then(toon=> {
        res.send({
            message: "success",
            toon
        })
    })
}