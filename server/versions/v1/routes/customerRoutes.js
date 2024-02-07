const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.post('/customers', customerController.createCustomer);

router.get('/customers/:customerId', customerController.getCustomerById);

router.put('/customers/:customerId', customerController.updateCustomer);

router.delete('/customers/:customerId', customerController.deleteCustomer);

module.exports = router;
