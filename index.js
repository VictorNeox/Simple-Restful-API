const debug = require('debug')('app:startup');

const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./logger');
const express = require('express');
const app = express();

const courses = require('./routes/courses');

app.set('view engine', 'pug');
app.set('views', './views'); // Default

if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled'); // console.log();
}

app.use('/api/courses', courses);

 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());

// Configuration
console.log(`Application name: ${config.get('name')}`);
// console.log(`Mail Password: ${config.get('mail.password')}`);


app.use(logger.log);

app.use(logger.authenticate);



app.get('/', (req, res) => {
    res.render('index', { title: 'My Express App', message: 'Hello' });
});

// PORT
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});