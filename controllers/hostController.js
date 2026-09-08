const Fertilizer = require("../model/home");
const User = require("../model/user");

// Single function to handle all product types
exports.getProducts = (req, res) => {
    const productType = req.query.type || 'fertilizer';

    Fertilizer.fetchByProduct(productType)
        .then(([products]) => {
            res.render('products.ejs', {
                pageTitle: productType.charAt(0).toUpperCase() + productType.slice(1),
                products,
                productType
            });
        })
        .catch(err => {
            console.log(err);
            res.render('products.ejs', {
                pageTitle: 'Products',
                products: [],
                productType
            });
        });
};

exports.getFarmerLogin = (req, res) => {
    const error = req.query.error === 'access'
        ? 'Please log in with the admin password to access the admin page.'
        : req.query.error === 'login'
            ? 'Please sign in to continue.'
            : null;

    res.render('farmerlog.ejs', { pageTitle: 'Login or Sign up', error, formMode: 'login' });
};

exports.postFarmerLogin = async (req, res) => {
    const { username, password, location, action } = req.body;
    const formMode = action === 'signup' ? 'signup' : 'login';

    if (!username || !password) {
        return res.render('farmerlog.ejs', {
            pageTitle: 'Login or Sign up',
            error: 'Username and password are required.',
            formMode
        });
    }

    try {
        if (formMode === 'signup') {
            if (username.trim().toLowerCase() === 'admin') {
                return res.render('farmerlog.ejs', {
                    pageTitle: 'Login or Sign up',
                    error: 'The admin account cannot be created here.',
                    formMode
                });
            }

            await new User(username.trim(), password, location).save();
            return res.render('farmerlog.ejs', {
                pageTitle: 'Login or Sign up',
                error: 'Account created. You can now log in.',
                formMode: 'login'
            });
        }

        if (username.trim().toLowerCase() === 'admin' && password === 'admin') {
            req.session.user = { username: 'admin' };
            req.session.isAdmin = true;
            res.cookie('auth', 'admin', {
                maxAge: 2 * 60 * 60 * 1000,
                httpOnly: true
            });
            return res.redirect('/add-product');
        }

        const [users] = await User.findByCredentials(username.trim(), password);
        if (!users.length) {
            return res.render('farmerlog.ejs', {
                pageTitle: 'Login or Sign up',
                error: 'Invalid username or password.',
                formMode
            });
        }

        req.session.user = {
            username: users[0].username,
            location: users[0].location
        };
        req.session.isAdmin = false;
        res.clearCookie('auth');
        return res.redirect('/');
    } catch (err) {
        const error = err.code === 'ER_DUP_ENTRY'
            ? 'That username is already registered.'
            : 'Unable to complete the request. Please try again.';
        return res.render('farmerlog.ejs', {
            pageTitle: 'Login or Sign up',
            error,
            formMode
        });
    }
};

exports.getLogout = (req, res) => {
    res.clearCookie('auth');
    req.session.destroy((err) => {
        return res.redirect('/');
    });
};

const allowedProducts = ['seed', 'fertilizer', 'nap', 'dap', 'pesticide', 'plantgrowth', 'tool'];

const normalizeProductType = (productType) => {
    return allowedProducts.includes(productType) ? productType : 'fertilizer';
};

const formatPageTitle = (productType, action = 'Add') => {
    const label = productType === 'dap'
        ? 'DAP'
        : productType === 'nap'
            ? 'NAP'
            : productType === 'plantgrowth'
                ? 'Plant Growth'
                : productType === 'tool'
                    ? 'Tool'
                    : productType.charAt(0).toUpperCase() + productType.slice(1);
    return `${action} ${label}`;
};

exports.getAddProduct = (req, res) => {
    const productType = normalizeProductType(req.query.type);

    res.render('edit.ejs', {
        pageTitle: formatPageTitle(productType, 'Add'),
        editing: false,
        fertilizer: { product: productType }
    });
};

exports.postAddProduct = (req, res, next) => {
    const { name, type, advantages, contents, photo, price, product } = req.body;
    const productType = normalizeProductType(product);

    const fertilizer = new Fertilizer(name, type, advantages, contents, photo, price, productType);

    fertilizer.save()
        .then(() => {
            res.redirect(`/products?type=${productType}`);
        })
        .catch(err => {
            console.log(err);
            res.redirect(`/add-product?type=${productType}`);
        });
};

exports.getEditFertilizer = (req, res) => {
    const productId = req.params.productId;

    Fertilizer.findById(productId)
        .then(([fertilizers]) => {
            const fertilizer = fertilizers[0];

            if (!fertilizer) {
                return res.redirect('/products?type=fertilizer');
            }

            res.render('edit.ejs', {
                pageTitle: formatPageTitle(fertilizer.product || 'fertilizer', 'Edit'),
                editing: true,
                fertilizer: fertilizer
            });
        })
        .catch(err => {
            console.log(err);
            res.redirect('/products?type=fertilizer');
        });
};

exports.postEditFertilizer = (req, res) => {
    const { id, name, type, advantages, contents, photo, price, product } = req.body;

    const fertilizer = new Fertilizer(name, type, advantages, contents, photo, price, product);
    fertilizer.id = id;

    fertilizer.save()
        .then(() => {
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/products?type=fertilizer');
        });
};

exports.postDeleteFertilizer = (req, res) => {
    Fertilizer.deleteById(req.params.productId)
        .then(() => res.redirect('/all-products'))
        .catch(err => console.log(err));
};