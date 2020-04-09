import {model, Schema, Document } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser extends Document{
    email: string;
    password: string;
    comparePassword: (password: string) => Promise<boolean>
}

const UserSchema = new Schema({
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true, //para que el texto sea en minuscula
        trim: true //para eliminar los espacios sobrantes
    },
    password:{
        type: String,
        required: true
    }
});

UserSchema.pre<IUser>('save', async function (next) { // funcion que se ejecuta antes de guardar un nuevo dato ala base de datos y me encripta la contraseña para mas seguridad
    const user = this;
    if(!user.isModified('password')) return next(); //verificamos si el campo password no alla sido actualizado

    const salt = await bcrypt.genSalt(10); //generamos el sifrado para el campo password
    const hash = await bcrypt.hash(user.password, salt); //guardamos el dato encriptado que tenemos al campo password, donde se guarda en una constante donde se nos guarda un string
    user.password = hash; //el nuevo string que tenemos lo gaurdamos al campo password donde ya esta encriptado
    next();
});

UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

export default model<IUser>('User', UserSchema);