const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const patientRouter = require('./routes/patient')
const appointmentRouter = require('./routes/appointment')
const indexRouter = require('./routes/index')
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const app = express()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app
    .use(bodyParser.json())
    .use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
    }))
    .use(passport.initialize())
    .use(passport.session());

app.use((req, res, next)=> {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})


passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }
));

passport.serializeUser(function(user, cb) {
    cb(null, user);
})
passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
})

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.username}` : `Not logged in`)})
app.get('/github/callback', passport.authenticate('github', 
{ failureRedirect: '/login' }), 
    (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
})

mongodb.initDb(err=> {
    if(err){
        console.log(err);
    }else{
        app.use('/', indexRouter)
        app.use('/patients', patientRouter);
        app.use('/appointments', appointmentRouter)
        app.listen(3000);
        console.log('Listening on port 3000')
    }
})