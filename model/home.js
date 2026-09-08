const products = [];
const db = require('../utils/databaseUtils');

module.exports = class Fertilizer {
constructor(name,type,advantages,contents,photo,price,product,id) {
    this.name = name;
    this.type = type;
    this.advantages = advantages;
    this.contents = contents;
    this.photo = photo;
    this.price = price;
    this.product = product;
    this.id = id;
  }

save(){
  if(this.id){
    return db.execute('UPDATE airbnb.fertilizer SET name = ?, type = ?, advantages = ?, contents = ?, photo = ?, price = ?, product = ? WHERE id = ?', [this.name, this.type, this.advantages, this.contents, this.photo, this.price, this.product, this.id]);
  } else {
  return db.execute('INSERT INTO airbnb.fertilizer (name, type, advantages, contents, photo, price, product) VALUES (?, ?, ?, ?, ?, ?, ?)', [this.name, this.type, this.advantages, this.contents, this.photo, this.price, this.product]);
}
}
static fetchAll(){
  return db.execute('SELECT * FROM airbnb.fertilizer;');
}
// Returns all products matching the given category stored in the `product` column.
// Controllers call this when they need to render category pages (e.g. /pesticide).
static fetchByProduct(product) {
  return db.execute('SELECT * FROM airbnb.fertilizer WHERE product = ?', [product]);
}
static findById(id) {
  return db.execute(
    'SELECT * FROM airbnb.fertilizer WHERE id = ?',
    [id]
  );
}
static deleteById(id){
  return db.execute("DELETE FROM airbnb.fertilizer WHERE id = ?", [id])
}}