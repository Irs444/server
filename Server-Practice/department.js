const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()

const departments = "departments"

const departmentSchema = new mongoose.Schema({
    departmentName: String,
    date:{
        type: Date,
        default: Date.now
    }
})

const departmentSchemaModel = mongoose.model(departments, departmentSchema)


router.post("/api/v1/create-department", (req, res) => {

    let departmentName = req.body.departmentName
    

    departmentSchemaModel({
       departmentName
    }).save()
    .then((resullt) => {
        res.status(200).send({
            success: true,
            message: "Department created successfully", 
            resullt
        })
    })
})

router.get("/api/v1/all-departments", (req, res) => {

    departmentSchemaModel.find({})

    .then((result) => {
        res.status(200).send({
            success: true,
            message:"Fetch Department successfully",
            result
        })
    })
})

// delete book API
router.delete("/api/v1/delete-department/:id", async (req, res) => {

    const departmentId = req.params.id
 
    
    const deleteDepartment = await departmentSchemaModel.findByIdAndDelete(departmentId)
     
    if(!deleteDepartment){
     return res.status(400).send({
         success:false,
         message:"Department not found."
     })
    }
 
    res.status(200).send({
     success: true,
     message:'Department delete successfully.'
    })
    
 })


module.exports =  router