import { getAllPosts, criarPost, atualizarPost } from "../models/postModels.js";
import fs from 'fs';
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listPosts(req, res) 
{
    const posts = await getAllPosts(); // Busca os posts do banco de dados.
    
    res.status(200).json(posts); // Retorna os posts no formato JSON com status 200 (sucesso).
    // console.log(index); // Este console.log está comentado e parece desnecessário neste contexto.
}

export async function postarNovoPost(req, res) 
{
    const novoPost = req.body;
    try
    {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    }
    catch (erro)
    {
        console.error(erro.message);
        res.status(500).json({ "erro": "Falha na requisição" });
    }
}

export async function uploadImagem(req, res) {
    const novoPost = {
        imgUrl: req.file.originalname,
        descricao: "",
        alt: ""
    };

    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada)
        res.status(200).json(postCriado);  
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}

export async function atualizarNovoPost(req, res) 
{
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;
    try
    {
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imageBuffer);

        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }

        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);
    }
    catch (erro)
    {
        console.error(erro.message);
        res.status(500).json({ "erro": "Falha na requisição" });
    }
}