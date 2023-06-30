const { Router } = require('express');
const cartsControllerBd = require('../controller/carts.controller.bd');
const permisions = require('../middlewares/permissions');
const stripe = require('stripe')('sk_test_51NMuifEUCvKs3mMNmSz9bpYdNQqu54Lc0kFRspSmOKqGnpc5iabFJNwZJg3aFoeI8UPxhQWQJ27OYQPDMsWDS7Ki00eG0Dgx2P');
const router = Router();

router.post('/', cartsControllerBd.createCarts);
router.get('/', cartsControllerBd.bdgetCart);
router.get('/:cid', cartsControllerBd.bdgetCartId);
router.post('/:cid/product/:pid', cartsControllerBd.addProductToCart);
router.delete('/:cid/product/:pid', cartsControllerBd.deleteProductToCart);
router.put('/:cid', cartsControllerBd.cartUpdate);
router.put('/:cid/product/:pid', cartsControllerBd.updateQuantityProduct);
router.delete('/:cid', cartsControllerBd.deleteToCart);
router.get('/:cid/purchase', permisions.userPermission, cartsControllerBd.purchase);
router.post('/payments/payment-intents', cartsControllerBd.paymentProcess);
module.exports = router;
