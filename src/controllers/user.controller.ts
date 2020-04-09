import {Request, Response, json} from 'express';
import User, { IUser } from '../models/user';
import jwt from 'jsonwebtoken'
import config from '../config/config'

function CrearToken(user: IUser){
    return jwt.sign({id: user.id, email: user.email}, config.jwtSecret, {
        expiresIn: 86400
    });
}

export const sigUp = async (req: Request, res: Response): Promise<Response> =>{
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({msg: 'Por favor, Ingrese contraseña y correo'})
    }
    
    const users = await User.findOne({email: req.body.email});
    if(users){
        return res.status(400).json({msg: 'El usuario Existe'});
    }
    
    const NewUser = new User(req.body);
    await NewUser.save();
    return res.status(201).json(NewUser);
}

export const sigIp = async (req: Request, res: Response) =>{
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({msg: 'Por favor, Ingrese contraseña y correo'})
    }

    const users = await User.findOne({email: req.body.email})
    if(!users){
        return res.status(400).json({msg: 'El usuario no existe'});
    }

    const SiExiste = await users.comparePassword(req.body.password);
    if(SiExiste){
        return res.status(200).json({token: CrearToken(users) });
    }

    return res.status(400).json({msg: 'Contraseña o Correo Incorrectos'});
}


