const express = require("express")
const mongoose = require("mongoose")
const app = express()

const PORT = 5000

const  User = require("./user")
const {router: Book} = require("./book")

// database connection
const uri = "mongodb+srv://irs786had123:irshad@cluster0.82yikc9.mongodb.net/server-practice?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(uri)


//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(User)
app.use(Book)



app.listen(PORT, () => {
    console.log(`sever started at PORT ${PORT}`);

})