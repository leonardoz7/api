const db= require('../db/db');
//MODULO DE CONEXÃO COM O BANCO DE DADOS 
const Joi = require('joi')
//biblioteca de validação de dados
const bcrypt = require('bcrypt');

const clienteSchema = Joi.object({
    cpf: Joi.string.length(11).required(),
    nome: Joi.string().required().max(50),
    endereco: Joi.string().required().max(80),
    bairro: Joi.string().required().max(30),
    cidade: Joi.string().required().max(30),
    cep: Joi.string().required(),
    telefone:Joi.string().required(),
    email:Joi.string().email().max(50),
    senha:Joi.string().min(6).max(300)
})

//listar todos os clientes
exports.listarClientes = async(req, res) =>{
    try{
        const [result] = await db.query('SELECT * FROM cliente')
        res.json(result)
    }catch(err) {
        console.error('Erro ao buscar clientes',err);
        res.status(500).json({error: 'Erro interno do servidor'})
    }
};

exports.listarClientes = async(req, res) =>{
    const {cpf} = req.params;
    try{
        const [result] = await db.query('SELECT * FROM cliente WHERE cpf = ?',[cpf])
        if (result.length === 0) {
            return res.status(404).json({error: 'Cliente não encontrado'})
        }
        res.json(result[0])
    
    }catch (err) {
        console.error('Erro ao buscar cliente:', err);
        res.status(500).json({error: 'Erro interno no servidor'})
    }
};

//adicionar um novo cliente 
exports.adicionarCliente = async (req, res) => {
    const { cpf, nome, endereco, bairro, cidade, cep, telefone, email, senha } = req.body;
    const { error } = clienteSchema.validate({ cpf, nome, endereco, bairro, cidade, cep, telefone, email, senha });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const hash = await bcrypt.hash(senha, 10);
        const novoCliente = { cpf, nome, endereco, bairro, cidade, cep, telefone, email, senha: hash };
        await db.query('INSERT INTO cliente SET ?', novoCliente);
        res.json({ message: 'Cliente adicionado com sucesso' });
    } catch (err) {
        console.error('Erro ao adicionar cliente: ', err);
        res.status(500).json({ error: 'Erro ao adicionar cliente' });
    }
};
