const express = require('express');
const hostController = require('../controllers/hostController');

const hostRouter = express.Router();

const requireAdmin = (req, res, next) => {
  if (req.session && req.session.isAdmin) {
    return next();
  }
  return res.redirect('/farmer?error=access');
};

const requireLogin = (req, res, next) => {
  if (req.session && (req.session.user || req.session.isAdmin)) {
    return next();
  }
  return res.redirect('/farmer?error=login');
};

const redirectToProducts = (type) => (req, res) => res.redirect(`/products?type=${type}`);

hostRouter.get('/products', requireLogin, hostController.getProducts);

['seed', 'fertilizer', 'nap', 'dap', 'pesticide', 'plantgrowth', 'tool'].forEach((type) => {
  hostRouter.get(`/${type === 'seed' ? 'seeds' : type}`, requireLogin, redirectToProducts(type));
});

hostRouter.get('/farmer', hostController.getFarmerLogin);
hostRouter.post('/farmer', hostController.postFarmerLogin);
hostRouter.get('/logout', hostController.getLogout);
hostRouter.get('/add-product', requireAdmin, hostController.getAddProduct);
hostRouter.get('/add-fertilizer', redirectToProducts('fertilizer'));
hostRouter.get('/edit/:productId', requireAdmin, hostController.getEditFertilizer);

hostRouter.post('/add-product', requireAdmin, hostController.postAddProduct);
hostRouter.post('/add-fertilizer', requireAdmin, hostController.postAddProduct);
hostRouter.post('/edit', requireAdmin, hostController.postEditFertilizer);
hostRouter.post('/delete/:productId', requireAdmin, hostController.postDeleteFertilizer);

exports.hostRouter = hostRouter;