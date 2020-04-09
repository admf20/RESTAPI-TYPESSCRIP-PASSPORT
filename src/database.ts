import mongoose, {ConnectionOptions} from 'mongoose'

import config from './config/config'

const dbOptions: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};

mongoose.connect(config.BD.URI, dbOptions);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("BD CONECTADA CON EXITO...");
    
});

connection.on('error', err => {
    console.log(err);
    process.exit(0);
});