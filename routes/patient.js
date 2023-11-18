const express = require('express')
const router = express.Router()
const patientController = require('../controllers/patient')

router.get('/', (req, res) => {
    /* 
        #swagger.tags = ['Patients']
        #swagger.description = 'Endpoint to get all patients'
        #swagger.path = '/patients'
    */
    patientController.getAllPatients(req, res); 
});

router.get('/:id', (req, res) => {
    /* 
        #swagger.tags = ['Patients']
        #swagger.description = 'Endpoint to get a patient by ID'
        #swagger.path = '/patients/{id}'
    */
    patientController.getPatientById(req, res); 
});


router.post('/create_patient', patientController.patientValidationRules, (req, res) => {
    /* 
        #swagger.tags = ['Patients']
        #swagger.description = 'Endpoint to create a patient'
        #swagger.path = '/patients/create_patient'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Object containing the patient information',
            schema: {
                $firstName: 'John',
                $lastName: 'Doe',
                $dateOfBirth: '1990-01-01',
                $gender: 'Male',
                $contactNumber: '801-555-5555',
                $emailAddress: 'jhon@mail.com',
                $address: '123 Main St.',
                $allergies: ['Peanuts'],
                $medicalHistory: 'None'
            }
        }
    */
    patientController.createPatient(req, res)
});

router.delete('/delete_patient/:id', (req, res) => {
    /* 
        #swagger.tags = ['Patients']
        #swagger.description = 'Endpoint to delete a patient'
        #swagger.path = '/patients/delete_patient/{id}'
    */
    patientController.deletePatient(req, res)
});

router.put('/update_patient/:id', patientController.patientValidationRules, (req, res) => {
    /*
    
        #swagger.tags = ['Patients']
        #swagger.description = 'Endpoint to update a patient'
        #swagger.path = '/patients/update_patient/{id}'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Object containing the patient information',
            schema: {
                $firstName: 'John',
                $lastName: 'Doe',
                $dateOfBirth: '1990-01-01',
                $gender: 'Male',
                $contactNumber: '801-555-5555',
                $emailAddress: 'jhon@mail.com',
                $address: '123 Main St.',
                $allergies: ['Peanuts'],
                $medicalHistory: 'None'
            }
        }
      
    */
       patientController.updatePatient(req, res)    
})

module.exports = router

