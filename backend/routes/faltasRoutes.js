const express = require('express');
const router = express.Router();
const faltasController = require('../controllers/faltasController');

router.get('/', faltasController.getAll);
router.get('/:id', faltasController.getOne);
router.post('/', faltasController.create);
router.put('/:id', faltasController.update);
router.delete('/:id', faltasController.delete);

module.exports = router;