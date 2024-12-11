const options = {
    swaggerDefinition: {
        info: {
            title: 'sit725-skipy',
            version: '1.0.0',
            description: `A website that imitates open table implementation`
        },
        host: `${process.env.SWA_HOST}:${process.env.SWA_PORT}`,
        basePath: '/',
        produces: ['application/json', 'application/xml'],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'authorization',
                description: 'token'
            }
        }
    },
    route: {
        url: '/swagger',
        docs: '/swagger.json' 
    },
    basedir: __dirname, 

    files: [  
        '../routes/**/*.js',
    ]
}

module.exports = options