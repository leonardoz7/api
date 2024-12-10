const express = require('express');
const router = express.Router();
const produtoController = require('../controller/produtocontroller');

router.get('/produto',produtoController.listaProdutos);

router.get('/produto/:idProduto',produtoController.listaProdutosID);

router.post('/produto',produtoController.adicionarprodutos);

router.put('/produto/:idProduto',produtoController.atualizarProduto);

router.delete('produto/:idProduto',produtoController.deletarProduto);

module.exports = router;
