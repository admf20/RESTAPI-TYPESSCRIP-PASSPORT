import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import passport from 'passport'
import passportMiddleware from './middlewares/passport'

//inicializamos express
const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);

//routes
app.get('/', (req,res) => {
      res.send('La API-REST esta corriendo en el puerto'+app.get('port'))
});

import authRoutes from './routes/auth.routes'
import specialRoutes from './routes/special.routes'

//Utilizamos los rutas que exportamos
app.use(authRoutes);
app.use(specialRoutes);

export default app;