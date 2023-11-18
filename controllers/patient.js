const mongodb = require('../db/connect')
const { check, validationResult } = require('express-validator');
const ObjectId = require('mongodb').ObjectId

const getAllPatients = async(req, res, next) => {
    const result = await mongodb.getDb().db('clinicdb').collection("patients").find().toArray()
    res.json(result)
}
const getPatientById = async(req, res, next) => {
    const result = await mongodb.getDb().db("clinicdb").collection("patients").findOne({_id: new ObjectId(req.params.id)
    })
    res.json(result)
}


const patientValidationRules = [
    check('firstName').notEmpty().withMessage('First name is required'),
    check('lastName').notEmpty().withMessage('Last name is required'),
    check('dateOfBirth').notEmpty().withMessage('Date of birth is required'),
    check('gender').notEmpty().withMessage('Gender is required'),
    check('contactNumber').isMobilePhone().withMessage('Invalid contact number'),
    check('emailAddress').isEmail().withMessage('Invalid email address'),
    check('address').notEmpty().withMessage('Address is required'),
    check('allergies').optional().isArray().withMessage('Allergies must be an array'),
    check('medicalHistory').optional()
  ];
  

const createPatient = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {firstName, lastName, dateOfBirth, gender, contactNumber, 
        emailAddress, address, alergies, medicalHistory,} = req.body

    try {
        const result = await mongodb.getDb().db("clinicdb").collection('patients').insertOne(req.body);
        if (result.acknowledged) {
            return res.status(201).json({id:result.insertedId})
        } else {
            return res.status(500).json({message: "Patient creation failed"})
        }
    } catch(error) {
        next(error)
    }
}

const deletePatient = async(req, res, next) => {
    const userId = new ObjectId(req.params.id); 
    try {
        const result = await mongodb.getDb().db("clinicdb").collection("patients").deleteOne({_id: userId});
        if (result.deletedCount > 0) {
            res.status(200).json({ message: "Patient deleted" }); // 
        } else if(result.matchedCount == 0) {
           res.status(404).json({message:"Id no found"})
            
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred while deleting the patient" });
    }
}

const updatePatient = async(req, res, next) => {
    const {firstName, lastName, dateOfBirth, gender, contactNumber, 
        emailAddress, address, alergies, medicalHistory,} = req.body
    const userId = new ObjectId(req.params.id);
    try {
        const result = await mongodb.getDb().db("clinicdb").collection("patients").replaceOne({_id: userId}, req.body);

        if(result.modifiedCount > 0) {
            res.status(200).json({ message: "Patient updated" }); // 
        } else if(result.matchedCount == 0) {
           res.status(404).json({message:"Id no found"})
            
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred while updating the patient" });
    }
}
module.exports = {
    getAllPatients,
    getPatientById,
    createPatient,
    patientValidationRules,
    deletePatient,
    updatePatient
}