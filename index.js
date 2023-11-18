const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const patientRouter = require('./routes/patient')
const appointmentRouter = require('./routes/appointment')
const app = express()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(bodyParser.json());

app.use((req, res, next)=> {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})



mongodb.initDb(err=> {
    if(err){
        console.log(err);
    }else{
        app.use('/patients', patientRouter);
        app.use('/appointments', appointmentRouter)
        app.listen(3000);
        console.log('Listening on port 3000')
    }
})