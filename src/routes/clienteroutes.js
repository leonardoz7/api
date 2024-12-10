const express = require('express');
const router = express.Router();
const clienteController = require('../controller/clientecontroller');
//IMPORTA O CONTOLLER DO CLIENTE

//rota para listar todos os clientes
router.get('/clientes',clienteController.listarClientes);

//rota para buscar um cliente por cpf
router.get('/clientes/:cpf',clienteController.listarClientesCpf);

//ROTA PARA ADICIONAR UM NOVO CLIENTE
router.post('/clientes',clienteController.adicionarCliente);

//ROTA PARA ATUALZAR UM CLIENTE POR CPF
router.put('/clientes/:cpf',clienteController.atualizarCliente);

//rota para deletar um cliente por cpf
router.delete('clientes/:cpf',clienteController.deletarCliente);

module.exports = router;