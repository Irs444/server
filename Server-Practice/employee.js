const mongoose = require("mongoose")
const {Router} = require("express")
const router = Router()

const employees = "employees"

const employeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    departmentId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "departments"
    },
    designationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "designations"
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const employeeSchemaModel = mongoose.model(employees, employeeSchema)

router.post("/api/v1/create-employee", async(req, res) => {

    let name = req.body.name
    let email = req.body.email
    let phone = req.body.phone
    let departmentId = req.body.departmentId
    let designationId = req.body.designationId

    employeeSchemaModel({
        name, email, phone, departmentId, designationId
    }).save()
    .then((result) => {
        res.status(200).send({
            success: true,
            message: "Employee created successfully",
            result
        })
    }).catch((error) => {
        res.status(500).send({
            success: false,
            message: "server side error.",
            error
        })
    })

})

router.get("/api/v1/all-employees", async(req, res) => {

    employeeSchemaModel.find({}).populate("departmentId").populate("designationId")
    .then((result) => {
        res.status(200).send({
            success: true,
            message: "Fetch all employee",
            result
        })
    }).catch((error) => {
        res.status(500).send({
            success: false,
            message: "server side error",
            error
        })
    })
})

router.delete("/api/v1/delete-employee/:id", async(req, res) => {

    const deleteEmployee = await employeeSchemaModel.findByIdAndDelete(req.params.id)

    if(!deleteEmployee){
         return res.status(400).send({
            success: false,
            message: "Employee not found",
         })
    }

    res.status(200).send({
        success: true,
        message: "Employee deleted successfully",
        deleteEmployee
    })
})

module.exports = router