const mongoose = require("mongoose")
const {Router} = require("express")
const router = Router()

const pages = "pages"

const pageSchema = new mongoose.Schema({
    chapterName: String,
    bookId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "books"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const pageSchemaModel = mongoose.model(pages, pageSchema)

// add pages API
router.post("/api/v1/add-page", async(req, res) => {

    let chapterName = req.body.chapterName
    let bookId = req.body.bookId
    let userId = req.body.userId

    pageSchemaModel({
        chapterName, bookId, userId
    }).save()
    .then((result) => {
        res.status(200).send({
            success: true,
            message:"Pages created successfully",
            result
        })
    }).catch((err) => {
         res.status(500).send({
            success: false,
            message:"server side error", 
            err
         })
    })
})

// getall pages API
router.get("/api/v1/get-all-pages", async (req, res) => {

    pageSchemaModel.find({}).populate("bookId").populate("userId")
        .then((result) => {
            res.status(200).send({
                success: true,
                message: "Fetch all pages.",
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

// delete pages API


module.exports = { router, pageSchemaModel}