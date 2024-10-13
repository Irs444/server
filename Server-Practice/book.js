const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()

const books = "books"

const bookSchema = new mongoose.Schema({
    bookName: String,
    bookAuther:[{
        type:mongoose.Schema.Types.ObjectId, ref:"users"
    }]
})

const bookSchemaModel = mongoose.model(books, bookSchema)


router.post("/api/v1/book-register", (req, res) => {

    let bookName = req.body.bookName
    let bookAuther = req.body.bookAuther

    bookSchemaModel({
        bookName, bookAuther
    }).save()
    .then((resullt) => {
        res.status(200).send({
            success: true,
            message: "Book created successfully", 
            resullt
        })
    })
})

router.get("/api/v1/get-all-books", (req, res) => {

    bookSchemaModel.find({}).populate("bookAuther")

    .then((result) => {
        res.status(200).send({
            success: true,
            message:"Book Detail shown",
            result
        })
    })
})

// delete book API
router.delete("/api/v1/delete-book/:id", async (req, res) => {

    const existBook = await bookSchemaModel.findById(req.params.id)

    if (!existBook) {
        return res.status(400).send({
            success: false,
            message: "Book not found"
        })
    }

    await existBook.deleteOne()

        .then((result) => {
            res.status(200).send({
                success: true,
                message: "Book delete successfully.",
                result
            })
        }).catch((err) => {
            res.status(500).send({
                success: false,
                message: 'server side error.',
                err
            })
        })

})


module.exports = { router, bookSchemaModel}