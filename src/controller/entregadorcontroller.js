const db = require('../db/db')
const Joi = require('joi')
 
const entregadorSchema = Joi.object({
    idEntregador: Joi.string().required().max(50),
    cnh: Joi.string().required(),
    telefoneEntregador: Joi.string().required().max(80),
    nomeEntregador: Joi.string().required().max(50),
})
 

exports.listaEntregador = async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM ENTREGADOR')
        res.json(result);
    } catch (err) {
        console.error('Erro ao buscar os entregadores:', err);
        res.status(500).json({ error: 'Erro interno do servidor' })
    }
}
 
exports.listaEntregadorID = async (req, res) => {
    const { idEntregador } = req.params;
    try {
        const [result] = await db.query('SELECT * FROM entregador WHERE idEntregador = ?', [idEntregador]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Entregador não localizado' })
        }
        res.json(result[0]);
    } catch (err) {
        console.error('Erro ao buscar o entregador', err);
        res.status(500).json({ error: 'Erro interno do servidor'})
    }
}
 

 
exports.adicionarEntregador = async (req, res) => {
    const { idEntregador, cnh, telefoneEntregador, nomeEntregador} = req.body;
    const { error } = entregadorSchema.validade({ idEntregador, cnh, telefoneEntregador, nomeEntregador });
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }
    try {
        const novoEntregador = { idEntregador, cnh, telefoneEntregador, nomeEntregador }
        await db.query('INSERT INTO produto SET ?', novoEntregador);
 
        res.json({ message: 'Entregador adicionado com sucesso' })
 
    } catch (err) {
        console.error('erro ao adicionar Entregador', err);
        res.status(500).json({ error: 'Erro ao adicionar o Entregador' })
    }
};
   
 
exports.atualizarEntregador = async (req, res) => {
    const { idEntregador } = req.params
    const { cnh, nomeEntregador, telefoneEntregador} = req.body;
    const { error } = entregadorSchema.validate({ idEntregador, cnh, telefoneEntregador, nomeEntregador });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const [result] = await db.query('SELECT * FROM cliente WHERE idEntregador = ?', [idEntregador]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Entregador não encontrado' });
        }
        await db.query('UPDATE produto SET ? WHERE idEntregador = ?', [idEntregador]);
        res.json({ message: 'Entregador atualizado com sucesso'});
    } catch (err) {
        console.error('Erro ao atualizar Entegador:', err);
        res.status(500).json({ error: 'Erro ao atualizar Entregador'})
    }
};

 
exports.deletarEntregador = async (req, res) => {
    const { idEntregador } = req.params;
    try {
        const [result] = await db.query ('SELECT * FROM produto WHERE idEntregador = ?', [idEntregador]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Entregador não encontrado' });
        }
        await db.query('DELETE FROM Entregador WHERE idEntregador = ?', [idEntregador]);
        res.json({ message: 'Entregador deletado com sucesso' })
    } catch (err) {
        console.error('Erro ao deletar Entregador:', err);
        res.status(500).json({ error: 'Erro ao deletar Entregador' })
    }
};
 