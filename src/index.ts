import app from './app'
import './database'

app.listen(app.get('port'));
console.log('Corriendo el Servidor', app.get('port'));
