//import carts collection
const { MongooseError } = require('mongoose')
const carts= require('../models/cartSchema')

//add to carts logic
exports.addtocart= async(req,res)=>{
    //get products details from request
    //using destructuring
    const {id,title,price,image,quantity}=req.body

    //logic
    try{
        //check id in mongodb
        const item= await carts.findOne({id})
        //check product in cart
        if(item){
            //increase quantity of item
            item.quantity+=1
            //update price grand total in mongodb 
            item.grandTotal=item.price*item.quantity
            //to save changes of item in mongodb
            item.save()
            res.status(200).json(item)
        }else{
            //add item into the carts
            const newItem=new carts({id,title,price,image,quantity,grandTotal:price})
            //to store newItem data in to mongodb
            await newItem.save()
            res.status(200).json(`Item added to Cart`)
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}




//get carts
exports.getcart= async(req,res)=>{
    //logic
    try{
        //get all wishlisted items from mongodb
        const allcartItems = await carts.find()
        res.status(200).json(allcartItems)
    }
    catch(error){
        res.status(401).json(error)
    }

}

//remove from carts
exports.removefromcart=async(req,res)=>{
    //get id from the request
    const {id}=req.params

    //check if id present in mongodb
    try{
        const removecartitem=await carts.deleteOne({id})
        if(removecartitem.deletedCount!=0){
            //get all carts items after removing particular carts item
            const remainingitems = await carts.find()   //ngOnInit only works one time while starting the page
            res.status(200).json(remainingitems)
        }
        else{
            res.status(404).json(error)
        } 
    }
    catch(error){
        res.status(401).json(error)
    }
}


//decrement cart item
exports.decrementcount=async(req,res)=>{
    //get product id from request params
    const{id}=req.params
    try{
        //check
        const product=await carts.findOne({id})
        if(product){
            //increment product count and grand total
            product.quantity-=1
            if(product.quantity==0)
            {
                //remove product from cart
                await carts.deleteOne({id})
                const allitems=await carts.find()
                res.status(200).json(allitems)
            }
            else{
                product.grandTotal=product.price*product.quantity
                //save changes in mongodb
                await product.save()
                //increment get all the products from the cart after updating in particular cart items
                const allitems=await carts.find()
                res.status(200).json(allitems)
            }
        }
        else{
            res.status(200).json(allitems)
        }
    }
    catch(error){
        res.status(404).json("Item not found")
    }
}


//decrement cart item
exports.incrementcount=async(req,res)=>{
    //get product id from request params
    const{id}=req.params
    try{
        //check
        const product=await carts.findOne({id})
        if(product){
            //decrement product count and grand total
            product.quantity+=1
            product.grandTotal=product.price*product.quantity
            //save changes in mongodb
            await product.save()
            //decrement get all the products from the cart after updating in particular cart items
            const allitems=await carts.find()
            res.status(200).json(allitems)
        }
        else{
            res.status(200).json(allitems)
        }
    }
    catch(error){
        res.status(404).json("Item not found")
    }
}