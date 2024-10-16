const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")

const PORT = 5000

const  User = require("./user")
const Department = require("./department")
const Designation = require("./designation")
const Employee = require("./employee")

// database connection
const uri = "mongodb+srv://irs786had123:irshad@cluster0.82yikc9.mongodb.net/server-practice?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(uri)


//middleware
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000"]
}))
app.use(express.urlencoded({ extended: false }))

app.use(User)
app.use(Department)
app.use(Designation)
app.use(Employee)



app.listen(PORT, () => {
    console.log(`sever started at PORT ${PORT}`);

})