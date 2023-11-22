const express = require('express')
const router = express.Router()
const appointmentController = require('../controllers/appointment')
const authenticate = require('../middleware/authenticate')



router.get('/', authenticate.isAuthenticated, (req, res)=> {
    /* 
        #swagger.tags = ['Appointments']
        #swagger.description = 'Endpoint to get all appointments'
        #swagger.path = '/appointments'
       
    */
    appointmentController.getAllAppointments(req, res);
});

router.get('/:id', (req, res)=> {
    /* 
        #swagger.tags = ['Appointments']
        #swagger.description = 'Endpoint to get an appointment by ID'
        #swagger.path = '/appointments/{id}'
    */
    appointmentController.getAppointmentById(req, res)
});

router.post('/create_appointment', authenticate.isAuthenticated, appointmentController.appointmentValidationRules, (req, res)=> {
    /*
        #swagger.tags = ['Appointments']
        #swagger.description = 'Endpoint to create an appointment'
        #swagger.path = '/appointments/create_appointment'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Object containing the appointment information',
            schema: {
                $doctorId: 'D3002',
                $appointmentDate: '2021-03-01T08:00:00.000Z',
                $purpose: 'Checkup',
                $status: 'Scheduled',
                $notes: 'Regular checkup',
                $patientId: '6558240a4dd4112f37b23141'
            }
        }
    */
    appointmentController.createAppointment(req, res)
})

router.delete('/delete_appointment/:id', (req, res)=> {
    /* 
        #swagger.tags = ['Appointments']
        #swagger.description = 'Endpoint to delete an appointment'
        #swagger.path = '/appointments/delete_appointment/{id}'
    */
    appointmentController.deleteAppointment(req, res)
})

router.put('/update_appointment/:id', appointmentController.appointmentValidationRules, (req, res)=> {
    /*
        #swagger.tags = ['Appointments']
        #swagger.description = 'Endpoint to update an appointment'
        #swagger.path = '/appointments/update_appointment/{id}'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Object containing the appointment information',
            schema: {
                $doctorId: 'D3002',
                $appointmentDate: '2021-03-01T08:00:00.000Z',
                $purpose: 'Checkup',
                $status: 'Scheduled',
                $notes: 'Regular checkup',
                $patientId: '6558240a4dd4112f37b23141'
            }
        }
    */
    appointmentController.updateAppointment(req, res)
})  


module.exports = router