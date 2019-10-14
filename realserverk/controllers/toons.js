const models = require('../models')
const Toons = models.toons
const User = models.user

exports.index = (req, res) => {
    Toons.findAll({
        include: [{
            model: User,
            as: "createdBy"
        }]
    }).then(toon=>res.send(toon))
}

exports.show = (req, res) => {
    Toons.findOne({id: req.params.id}).then(toon=> res.send(toon))
}

exports.store = (req, res) => {
    Toons.create(req.body).then(toon=> {
        res.send({
            message: "success",
            toon
        })
    })
}

exports.update = (req, res) => {
    Toons.update(
        req.body,
        {where: {id: req.params.id}}
    ).then(toon=> {
        res.send({
            message: "success",
            toon
        })
    })
}

exports.delete = (req, res) => {
    Toons.destroy({where: {id: req.params.id}}).then(toon=> {
        res.send({
            message: "success",
            toon
        })
    })
}