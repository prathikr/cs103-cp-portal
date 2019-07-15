const Clothing = require("../../models/Clothing");
const mongoose = require("mongoose")

module.exports = (app) => {
  mongoose.set('useFindAndModify', false);

  app.post('/api/settings/clothing', (req, res, next) => {
    const { price, imgs } = req.body;
    const user = req.user;
    let { type } = req.body;
    if (!type) {
      return res.send({
        success: false,
        message: "Error: Username cannot be empty."
      });
    }
    type = type.toUpperCase();
    if (type != 'KURTA' && type != 'SARI') {
      return res.send({
        success: false,
        message: "Error: Type must be Kurta or Sari."
      });
    }
    if (!price) {
      return res.send({
        success: false,
        message: "Error: Username cannot be empty."
      });
    }
    const newClothing = new Clothing();
    newClothing.type = type;
    newClothing.price = price;
    newClothing.user = user;
    if (img) {
      newClothing.img = img;
    }
    newClothing.save((err, clothing) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server error."
        });
      } else {
        return res.send({
          success: true,
          message: "Clothing registered!"
        });
      }
    });
  });
}
