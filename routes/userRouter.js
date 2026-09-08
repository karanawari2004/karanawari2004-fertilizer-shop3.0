const express = require('express');
const userController = require('../controllers/userController');

const userRouter = express.Router();

const requireLogin = (req, res, next) => {
    if (req.session && (req.session.user || req.session.isAdmin)) {
        return next();
    }
    res.redirect('/farmer?error=login');
};

userRouter.get('/', userController.Home);
userRouter.get('/all-products', requireLogin, userController.AllProducts);
userRouter.post('/buy/:productId', requireLogin, userController.postBuyProduct);
userRouter.post('/cart/increase/:productId', requireLogin, userController.postIncreaseCartItem);
userRouter.post('/cart/decrease/:productId', requireLogin, userController.postDecreaseCartItem);
userRouter.post('/cart/remove/:productId', requireLogin, userController.postRemoveCartItem);
userRouter.get('/bill', requireLogin, userController.getBilling);

module.exports = userRouter;