//import wishlist collection
const wishlist= require('../models/wishlistSchema')

//add to wishlist logic
exports.addtowishlist= async(req,res)=>{
    //get products details from request
    //using destructuring
    const {id,title,price,image}=req.body

    //logic
    try{
        //check id in mongodb
        const item= await wishlist.findOne({id})
        if(item){
            res.status(403).json('Item Already Exist in Wishlist')
        }else{
            //add item into the wishlist
            const newItem=new wishlist({id,title,price,image})
            //to store in to mongodb
            await newItem.save()
            res.status(200).json('Item Added to the Wishlist')
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}

//get wishlist
exports.getwishlist= async(req,res)=>{
    //logic
    try{
        //get all wishlisted items from mongodb
        const allWishlistItems = await wishlist.find()
        res.status(200).json(allWishlistItems)
    }
    catch(error){
        res.status(401).json(error)
    }

}

//remove from wishlist
exports.removewishlistitems=async(req,res)=>{
    //get id from the request
    const {id}=req.params

    //check if id present in mongodb
    try{
        const removewishlistitem=await wishlist.deleteOne({id})
        if(removewishlistitem){
            //get all wishlist items after removing particular wishlist item
            const allWishlistItems = await wishlist.find()   //ngOnInit only works one time while starting the page
            res.status(200).json(allWishlistItems)
        }
        else{
            res.status(404).json(error)
        } 
    }
    catch(error){
        res.status(401).json(error)
    }
}
