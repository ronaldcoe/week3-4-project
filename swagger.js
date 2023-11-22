const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Clinic API',
        description: 'The Clinic API provides the endpoints for the clinic API'
    },
    host: 'cse-341-project2-0zh1.onrender.com',
    schemes: ['https'],
    securityDefinitions: {
        OAuth2: {
            type: 'oauth2',
            authorizationUrl: 'https://cse-341-project2-0zh1.onrender.com/login',
            tokenUrl: 'https://github.com/login/oauth/access_token',
            flow: 'accessCode', // or 'implicit', 'password', or 'application' depending on your OAuth2 flow
            scopes: {
                read: 'Read access to protected resources',
                write: 'Write access to protected resources'
            }
        }
    },
    // If you have global security (applied to all endpoints) you can define it here
    security: [{
        OAuth2: ['read', 'write']
    }]
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/patient.js', './routes/appointment.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('Successfully generated swagger documentation.');
});
