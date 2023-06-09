const { Router } = require('express');
const productsControllerBD = require('../controller/products.controller.bd');
const { default: isAdmin } = require('../middlewares/isAdmin');
const adminPermission = require('../middlewares/isAdmin');
const premiumPermission = require('../middlewares/isPremium');

const router = Router();

router.get('/', productsControllerBD.getProductsBd);
router.post('/', productsControllerBD.addProductBd);
// router.post('/', adminPermission, premiumPermission, productsControllerBD.addProductBd);
router.get('/:pid', productsControllerBD.getProductIdBd);
router.put('/:pid', productsControllerBD.UpdateProductBd);
router.delete('/:pid', adminPermission, premiumPermission, productsControllerBD.deleteProductBd);

module.exports = router;
