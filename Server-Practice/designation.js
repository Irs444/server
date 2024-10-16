const mongoose = require("mongoose")
const {Router} = require("express")
const router = Router()

const designations = "designations"

const designationSchema = new mongoose.Schema({
    departmentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "departments"
    },
    designationName: String,
    date: {
        type: Date,
        default: Date.now
    }
})

const designationSchemaModel = mongoose.model(designations, designationSchema)


router.post("/api/v1/create-designation", async(req, res) => {

    let departmentId = req.body.departmentId
    let designationName = req.body.designationName

    designationSchemaModel({
        departmentId, designationName
    }).save()
    .then((result) => {
        res.status(200).send({
            success: true,
            message:"Designation created successfully",
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


router.get("/api/v1/all-designations", async (req, res) => {

    designationSchemaModel.find({}).populate("departmentId")
        .then((result) => {
            res.status(200).send({
                success: true,
                message: "Fetch all designations.",
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

module.exports =  router 