const mongoose = require("mongoose")
const express = require("express")
const { bookSchemaModel } = require("./department")
const router = express.Router()

const users = "users"

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    date: {
        type: Date,
        default: Date.now()
    }
})

const userSchemaModel = mongoose.model(users, userSchema)

router.post("/api/v1/register", (req, res) => {

    let name = req.body.name
    let email = req.body.email
    let password = req.body.password

    userSchemaModel({
        name, email, password
    }).save()
        .then((result) => {
            res.status(200).send({
                success: true,
                message: "User register successsfully",
                result
            })
        })
})

// login user API
router.post("/api/v1/login", async(req, res) => {

    let email = req.body.email
    let password = req.body.password

    userSchemaModel.findOne(req.body)
    .then((result) => {
       if(result){
        res.status(200).send({
            success: true,
            message: "User login successfully.",
            result
        })
       }else{
        res.status(404).send({
            success: false,
            message: "Invalide credentials",

        })
       }
    }).catch((err) => {
        res.status(500).send({
            success: false,
            message: "server side error"
        })
    })
})

// get all user API
router.get("/api/v1/get-all-users", async (req, res) => {

    userSchemaModel.find({})
        .then((result) => {
            res.status(200).send({
                success: true,
                message: "Fetch all users.",
                result
            })
        }).catch((err) => {
            res.status(500).send({
                success: false,
                message: "server side error",
                err
            })
        })
})

// delete user API
router.delete("/api/v1/delete-user/:id", async (req, res) => {

   const userId = req.params.id
   
   // check if any book exist for this user
   const book = await bookSchemaModel.findOne({bookAuther:userId})

   if(book){
    return res.status(400).send({
        success: false,
        message:"cannot delete user as books are link to it."
    })
   }

   // if no book is exist than delete user.
   const deleteUser = await userSchemaModel.findByIdAndDelete(userId)
    
   if(!deleteUser){
    return res.status(400).send({
        success:false,
        message:"user not found."
    })
   }

   res.status(200).send({
    success: true,
    message:'User delete successfully.'
   })
   
})

module.exports = router