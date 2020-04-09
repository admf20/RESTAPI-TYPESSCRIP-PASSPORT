export default {
    jwtSecret: process.env.JWT_SECRET || 'somesecrettoken', //configuracion del module para el JWT
    BD:{                                                    //configuarcion del modelu en la base de datos
        URI: process.env.MONGODB_URI || 'mongodb://localhost/jwtTutorial',
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD
    }
}