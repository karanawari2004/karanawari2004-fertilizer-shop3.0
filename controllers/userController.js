const Fertilizer = require('../model/home');

exports.Home = (req, res, next) => {
    res.render('home.ejs', { pageTitle: 'Home' });
};

exports.AllProducts = (req, res, next) => {
    Fertilizer.fetchAll()
        .then(([row]) => {
            res.render('all-products.ejs', {
                products: row,
                pageTitle: 'All Products'
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postBuyProduct = (req, res, next) => {
    const productId = req.params.productId;

    Fertilizer.findById(productId)
        .then(([products]) => {
            const product = products[0];
            if (!product) {
                return res.redirect('/all-products');
            }

            if (!req.session.cart) {
                req.session.cart = [];
            }

            const existingItem = req.session.cart.find(item => String(item.id) === String(product.id));

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                req.session.cart.push({
                    id: product.id,
                    name: product.name,
                    price: Number(product.price),
                    quantity: 1
                });
            }

            return res.redirect('/bill');
        })
        .catch(err => {
            console.log(err);
            res.redirect('/all-products');
        });
};

exports.postIncreaseCartItem = (req, res, next) => {
    const cart = req.session.cart || [];
    const productId = req.params.productId;
    const item = cart.find(item => String(item.id) === String(productId));

    if (item) {
        item.quantity += 1;
        req.session.cart = cart;
    }

    res.redirect('/bill');
};

exports.postDecreaseCartItem = (req, res, next) => {
    const cart = req.session.cart || [];
    const productId = req.params.productId;
    const itemIndex = cart.findIndex(item => String(item.id) === String(productId));

    if (itemIndex !== -1) {
        cart[itemIndex].quantity -= 1;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        req.session.cart = cart;
    }

    res.redirect('/bill');
};

exports.postRemoveCartItem = (req, res, next) => {
    const cart = req.session.cart || [];
    const productId = req.params.productId;
    req.session.cart = cart.filter(item => String(item.id) !== String(productId));
    res.redirect('/bill');
};

exports.getBilling = (req, res, next) => {
    const cart = req.session.cart || [];
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    res.render('billing.ejs', {
        pageTitle: 'Billing',
        cart,
        total
    });
};