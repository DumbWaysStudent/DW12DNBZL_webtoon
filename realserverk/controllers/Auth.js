  
const jwt = require('jsonwebtoken')

const models = require('../models')
const User = models.user

exports.login = (req, res)=>{    
    //check if email and pass match in db tbl user
    const email = req.body.email
    const password = req.body.password //use encryption in real world case!

    User.findOne({where: {email, password}}).then(user=>{
        if(user){
            const token = jwt.sign({ userId: user.id }, 'my-secret-key')
            res.send({
                user,
                token,

            }) 
        }else{
            res.send({
                error: true,
                message: "Wrong Email or Password!"
            })
        }
    }) 
}

exports.register = (req, res)=>{    
    //check if email and pass match in db tbl user
    const email = req.body.email
    const password = req.body.password
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