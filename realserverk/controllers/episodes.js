const models = require('../models')
const Toons = models.toons
const Episodes = models.episodes


exports.index = (req, res) => {
    Episodes.findAll({
        where : {
            toons_id : req.params.toonID
        },
        include: [{
            model: Toons,
            as: "toonsid"
        }]
    }).then(toons=>res.send(toons))
}

