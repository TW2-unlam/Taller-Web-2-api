const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const checkAuth = require('../middlewares/check-auth.ts');

// Listar productos
router.get('/products', productController.get)

// Detalle de Producto
router.get('/products/:id', productController.show)

// Ruta de prueba para auth
router.get('/clasified', checkAuth, productController.get)

module.exports = router;
