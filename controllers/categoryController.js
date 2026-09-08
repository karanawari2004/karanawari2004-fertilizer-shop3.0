const Fertilizer = require('../model/home');

// Map each product type to its dedicated view file for clarity and maintainability.
// Makes the code easier to understand: each category has its own page.
const renderProductPage = (res, productType, viewFile) => {
  Fertilizer.fetchByProduct(productType)
    .then(([products]) => {
      res.render(viewFile, {
        pageTitle: productType.charAt(0).toUpperCase() + productType.slice(1),
        products
      });
    })
    .catch(err => {
      console.log(err);
      res.render(viewFile, {
        products: []
      });
    });
};

exports.getSeedsPage = (req, res) => {
  renderProductPage(res, 'seed', 'seeds-products.ejs');
};

exports.getFertilizerPage = (req, res) => {
  renderProductPage(res, 'fertilizer', 'fertilizer-products.ejs');
};

exports.getNapPage = (req, res) => {
  renderProductPage(res, 'nap', 'nap-products.ejs');
};

exports.getDapPage = (req, res) => {
  renderProductPage(res, 'dap', 'dap-products.ejs');
};

exports.getPesticidePage = (req, res) => {
  renderProductPage(res, 'pesticide', 'pesticide-products.ejs');
};

exports.getPlantGrowthPage = (req, res) => {
  renderProductPage(res, 'plantgrowth', 'plantgrowth-products.ejs');
};

exports.getToolPage = (req, res) => {
  renderProductPage(res, 'tool', 'tool-products.ejs');
};

module.exports.renderProductPage = renderProductPage;

// Unified handler: supports query parameter `type` to route to the correct category view file.
exports.getProductsByCategory = (req, res) => {
  const productType = req.query.type || 'fertilizer';

  const typeMap = {
    'seed': 'seeds-products.ejs',
    'fertilizer': 'fertilizer-products.ejs',
    'nap': 'nap-products.ejs',
    'dap': 'dap-products.ejs',
    'pesticide': 'pesticide-products.ejs',
    'plantgrowth': 'plantgrowth-products.ejs',
    'tool': 'tool-products.ejs'
  };

  const viewFile = typeMap[productType] || typeMap['fertilizer'];

  renderProductPage(res, productType, viewFile);
};
