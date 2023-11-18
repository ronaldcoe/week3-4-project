const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Clinic API',
        description: 'The Clinic API provides the endpoints for the clinic API'
    },
    host: 'cse341-mz1u.onrender.com',
    schemes: ['https'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/patient.js', './routes/appointment.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('Successfully generated swagger documentation.');
});
