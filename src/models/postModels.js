import dotenv from 'dotenv/config';
// Importa uma função customizada para conectar ao banco de dados.
import { ObjectId } from 'mongodb';
import conectarAoBanco from '../config/dbConfig.js';

// Conecta ao banco de dados usando uma string de conexão definida nas variáveis de ambiente.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO); // Certifique-se de tratar erros nessa conexão.

// Função assíncrona para buscar todos os posts no banco de dados.
export async function getAllPosts() {
    const db = conexao.db("meu-server"); // Seleciona o banco de dados "meu-server".
    const colection = db.collection("posts"); // Acessa a coleção "posts".
    return colection.find().toArray(); // Retorna todos os documentos como array.
}

export async function criarPost(novoPost) {
    const db = conexao.db("meu-server"); // Seleciona o banco de dados "meu-server".
    const colection = db.collection("posts"); // Acessa a coleção "posts".
    return colection.insertOne(novoPost); // Insere um novo documento na coleção.
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("meu-server"); // Seleciona o banco de dados "meu-server".
    const colection = db.collection("posts"); // Acessa a coleção "posts".
    const objectId = ObjectId.createFromHexString(id);
    return colection.updateOne({_id: new ObjectId(objectId)}, {$set:novoPost}); // Insere um novo documento na coleção.
}