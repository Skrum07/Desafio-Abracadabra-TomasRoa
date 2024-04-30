import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

const __dirname = path.resolve();

const usuarios = [
    'Juan',
    'Jocelyn',
    'Astrid',
    'Maria',
    'Ignacia',
    'Javier',
    'Brian',
];

app.use(express.static('assets'));

app.get('/', (req, res) => {
    res.send('Este es el servidor de Abracadabra')
});

app.get('/abracadabra/usuarios', (req, res) => {
    res.json({usuarios});
});
 


app.use('/abracadabra/juego/:usuario', (req, res, next) => {
    const usuario = req.params.usuario
    const validar = usuarios.map((u) => u.toLowerCase()).includes(usuario.toLowerCase())
    if(validar){
        next()
    } else {
        res.sendFile(__dirname + '/assets/img/who.jpeg')
    }
});

app.get('/abracadabra/juego/:usuario', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


app.get('/abracadabra/juegos/:usuario', (req, res) => {
    res.sendFile (__dirname + '/index.html');
});


app.get('/abracadabra/conejo/:n', (req, res) => {
    const numero  = Math.floor(Math.random() * 4 + 1);
    const n = + req.params.n;
    if (n == numero ){
        res.sendFile(__dirname + './assets/img/conejito.jpg');
    } else {
        res.sendFile((__dirname + './assets/img/voldemort.jpg'));
    } 
});

app.get('/*', (req, res) => {
    res.send(
        '<center><h1>Esta página no existe</h1></center>'
    );
});

app.listen(port, () => {
    console.log(`Servidor operativo en http://localhost:${port}`);
});

