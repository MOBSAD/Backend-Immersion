// Importa o framework Express.js e a função "json" para lidar com dados no formato JSON.
import express, { json } from 'express';
import routes from './src/routes/postRoutes.js';

// Cria uma instância do aplicativo Express.
const app = express();

app.use(express.static("uploads"));

routes(app);


// Inicia o servidor e escuta na porta 3000.
app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});


