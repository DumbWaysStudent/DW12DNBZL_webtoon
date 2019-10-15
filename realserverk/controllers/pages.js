const models = require('../models')
const Pages = models.pages
const Episodes = models.episodes
const Toons = models.toons


exports.index = (req, res) => {
    Pages.findAll({
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
    }).then(pages=>res.send(pages))
}

