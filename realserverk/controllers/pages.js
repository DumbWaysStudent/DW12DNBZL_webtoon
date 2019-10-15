const models = require('../models')
const Pages = models.pages
const Episodes = models.episodes
const Toons = models.toons


exports.index = (req, res) => {
    let query
    if ((req.params.user_id)&&(req.params.webtoonid)&&(req.params.episodeid)){
        query = Pages.findAll({
            where : {
                episodes_id : req.params.episodeid
            },
            include: [{
                model: Episodes,
                as: "episodesid",
                where : {
                    toons_id : req.params.webtoonid
                },
                include : [{
                    model: Toons,
                    as: "toonsid",
                }]
            }]
        })
    }else{
    query = Pages.findAll({
        where : {
            episodes_id : req.params.epsID
        },
        include: [{
            model: Episodes,
            as: "episodesid",
            where : {
                toons_id : req.params.toonID
            },
            include : [{
                model: Toons,
                as: "toonsid"
            }]
        }]
    })
    }
    //console.log(req.params.user_id,req.params.webtoonid,req.params.episodeid)
    query.then(pages=>res.send(pages))
}

exports.update = (req, res) => {
    let updatequery
    const data ={
        toons_id : req.params.webtoonid,
        title : req.body.title,
        image : req.body.image
    }
    updatequery = Episodes.update(
        data,
        {where: {toons_id: req.params.webtoonid,
                id:req.params.episodeid}}
        )

    updatequery.then(toon=> {
        res.send({
            message: "success",
            data,
            toon
        })
    })
}

exports.store = (req, res) => {
    const storedata ={
        episodes_id : req.params.episodeid,
        image :req.body.image,
        page : req.body.page
    }
    Pages.create(storedata).then(toon=> {
        res.send({
            message: "success",
            toon
        })
    })
}

exports.delete = (req, res) => {
    Pages.destroy({where: {
        episodes_id: req.params.episodeid,
        id : req.params.imageid}
        }).then(toon=> {
        res.send({
            message: "successss",
            toon
        })
    })
}