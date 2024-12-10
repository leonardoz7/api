const Joi = require('joi')
const db = require('../db/db')


const pedidoSchema = Joi.object({
    idPedido: Joi.string().required(),
    dataPedido: Joi.string.required(),
    qtdeItens: Joi.string().required(),
    formaPagto: Joi.string().required().max(25),
    valorTotal: Joi.string().required(),
    observacao:  Joi.string().required(),
    cpf: Joi.string().required(),
    idEntregador: Joi.string().required()
})