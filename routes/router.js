// define routes for client request, Create routes folder and router.js file 

// 	-> import express 
const express = require('express')

//import productController
const productController= require('../controllers/productController')

//import wishlistController
const wishlistController= require('../controllers/wishlistController')

//import cartController
const cartController= require('../controllers/cartController')

// 	->using express create an object for router class inorder to setup 	     path
const router=new express.Router()

// 	->Resolving client requests
//api - getallproduct request
router.get('/products/all-products',productController.getallproducts)

//api - viewproduct request
router.get('/products/view-product/:id',productController.viewproduct)

//api - add to wishlist request 
router.post('/wishlist/add-to-wishlist',wishlistController.addtowishlist)

//api - getwishlist request
router.get('/wishlist/get-wishlist',wishlistController.getwishlist)

//api - remove wishlist item request
router.delete('/wishlist/remove-wishlist-item/:id',wishlistController.removewishlistitems)

//api - add item to cart request
router.post('/cart/add-to-cart',cartController.addtocart)

//api - getcart request
router.get('/cart/get-cart',cartController.getcart)

//api - remove cart item request
router.delete('/cart/remove-cart-item/:id',cartController.removefromcart)

//api - add quantity of cart item
router.get('/cart/increment-count/:id',cartController.incrementcount)

//api - reduce quantity of cart item
router.get('/cart/decrement-count/:id',cartController.decrementcount)

//export router
module.exports= router