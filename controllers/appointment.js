const mongodb = require('../db/connect')
const { check, validationResult } = require('express-validator');
const ObjectId = require('mongodb').ObjectId

const getAllAppointments = async(req, res, next) => {
    const result = await mongodb.getDb().db('clinicdb').collection("appointments").find().toArray()
    res.json(result)

}
const getAppointmentById = async(req, res, next) => {
    const result = await mongodb.getDb().db("clinicdb").collection("appointments").findOne({_id: new ObjectId(req.params.id)
    })
    res.json(result)
}

const appointmentValidationRules = [
    check('doctorId').notEmpty().withMessage('Doctor ID is required'),
    check('appointmentDate').isISO8601().toDate().withMessage('Invalid appointment date'),
    check('purpose').notEmpty().withMessage('Purpose is required'),
    check('status').notEmpty().withMessage('Status is required'),
    check('notes').notEmpty().withMessage('Notes is required'),
    check('patientId').notEmpty().withMessage('Patient ID is required'),
]

const createAppointment = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {doctorid, appointmentDate, purpose, status, notes, patientId} = req.body

    try {
        const result = await mongodb.getDb().db("clinicdb").collection('appointments').insertOne(req.body);
        if (result.acknowledged) {
            return res.status(201).json({id:result.insertedId})
        } else {
            return res.status(500).json({message: "Appointment creation failed"})
        }
    } catch(error) {
        next(error)
    }
}

const deleteAppointment = async(req, res, next) => {
    const userId = new ObjectId(req.params.id); 
    try {
        const result = await mongodb.getDb().db("clinicdb").collection("appointments").deleteOne({_id: userId});
        if (result.deletedCount > 0) {
            res.status(200).json({ message: "Appointment deleted" }); // 
        } else if(result.matchedCount == 0) {
           res.status(404).json({message:"Id no found"})
            
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred while deleting the appointment" });
    }
}

const updateAppointment = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const userId = new ObjectId(req.params.id); 
    const {doctorId, appointmentDate, purpose, status, notes, patientId} = req.body;

    try {
        const result = await mongodb.getDb().db("clinicdb").collection("appointments").replaceOne({_id: userId}, req.body);

        if (result.modifiedCount > 0) {
            res.status(200).json({ message: "Appointment updated" }); // 
        } else if(result.matchedCount == 0) {
           res.status(404).json({message:"Id no found"})
            
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred while updating the appointment" });
    }
}

module.exports = {
    getAllAppointments,
    getAppointmentById,
    createAppointment,
    appointmentValidationRules,
    deleteAppointment,
    updateAppointment
}