var express = require('express');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
var productHelper = require("../helpers/product-helpers")

/* GET users listing. */
router.get('/', function (req, res, next) {

  productHelpers.getAllProducts().then((products) => {
    console.log(products)
    res.render('admin/view-products', { admin: true, products })

  })



});
router.get("/add-product", function (req, res) {
  res.render("admin/add-product", { admin: true })
})
router.post("/add-product", function (req, res) {
  console.log(req.body)
  console.log(req.files.image)
  productHelper.addProduct(req.body, (id) => {
    console.log(id);
    let image = req.files.image

    image.mv("./public/product-images/" + id + ".jpeg", (err) => {  //saving

      if (!err)
        res.render("admin/add-product")
      else
        console.log(err);
    })

  })
})
module.exports = router;
