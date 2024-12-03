const express = require('express');
const router = express.Router();
 
//Exemplo de uma rota GET
router.get('/usuario',(req,res) =>{ res.send('Rota do usuário');});
 
// exemplo de outra rota GET
router.get('/leo', (req,res)=> {res.send('Rota do Leonardo');});
//exporte o roteador para que ele possa se usadado no index.js
module.exports = router;