const mongoose = require("mongoose")
const express = require("express")
const { pageSchemaModel } = require("./pages")
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

    const bookId = req.params.id
    
    // check if any book exist for this user
    const page = await pageSchemaModel.findOne({bookId:bookId})
 
    if(page){
     return res.status(400).send({
         success: false,
         message:"cannot delete book as pages are link to it."
     })
    }
 
    // if no book is exist than delete user.
    const deleteBook = await bookSchemaModel.findByIdAndDelete(bookId)
     
    if(!deleteBook){
     return res.status(400).send({
         success:false,
         message:"book not found."
     })
    }
 
    res.status(200).send({
     success: true,
     message:'Book delete successfully.'
    })
    
 })


module.exports = { router, bookSchemaModel}