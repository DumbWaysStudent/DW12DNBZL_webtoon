  
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)
const models = require('../models')
const User = models.user

exports.login = (req, res)=>{    
    //check if email and pass match in db tbl user
    const email = req.body.email
    const password = req.body.password //use encryption in real world case!
    
    User.findOne({where: {email}}).then(user=>{
        if(user){
            bcrypt.compare(password, user.password, function (err, result) {
            if(result == true) {
            const token = jwt.sign({ userId: user.id }, 'my-secret-key')
            res.send({
                user,
                token,
            }) 
            }
            })
        }else{
            res.send({
                error: true,
                message: "Wrong Email or Password!",
                
            })
        }
    }) 
}

exports.register = (req, res)=>{    
    //check if email and pass match in db tbl user
    const email = req.body.email
    const password = bcrypt.hashSync(req.body.password,salt)
    const name = req.body.name //use encryption in real world case!

    User.findOne({where: {email: email}}).then(user=>{
        if(user){
            res.send({
                error: true,   
                message: "Email already registered"
            }) 
        }else{
            const data = {
                email : email,
                password : password,
                name : name
            }
            User.create(data).then(user => {
                res.send({
                    message: "success",
                    user
                })
            })
        }
    }) 
}


exports.index = (req,res) =>{
    User.findOne({where: {id : req.params.user_id}}).then(user=>{
        res.send(user)
        })
    
}