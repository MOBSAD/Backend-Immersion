import express from 'express';
import multer from 'multer';
import { atualizarNovoPost, listPosts, postarNovoPost, uploadImagem } from '../controllers/postsController.js';
import cors from 'cors';

const corsOpions = {
    origin: "http://localhost:8000",
    optionSuccessStatus: 200
};

const upload = multer({dest: "./uploads"});

const routes = (app) => {
    // Middleware para que o servidor possa interpretar requisições no formato JSON.
    app.use(express.json());

    app.use(cors(corsOpions));

    // Rota para listar todos os posts.
    // Endpoint: GET /posts
    app.get("/posts", listPosts);
    app.post("/posts", postarNovoPost);
    app.post("/upload", upload.single('imagem'), uploadImagem);

    app.put("/upload/:id", atualizarNovoPost);
}

//exporta a função routes
export default routes;