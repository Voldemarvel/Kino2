const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express')
const yaml = require('yamljs')
const swaggerDocument = yaml.load('swagger.yaml')

// Copy env variables from .env file to process.env
require('dotenv').config()

app.use(express.json())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(process.env.PORT, () => {
    console.log('Listening on http://localhost:' + process.env.PORT + '/docs');
})