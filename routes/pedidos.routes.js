const express = require('express');
const controller = require('../controllers/pedidos.controller');

const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.createPedido);
router.put('/:id', controller.updatePedido);
router.delete('/:id', controller.deletePedido);

module.exports = router;