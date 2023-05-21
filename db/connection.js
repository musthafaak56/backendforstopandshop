//import mongoose
const mongoose=require('mongoose')

//accessing env file for connection string
const db=process.env.DATABASE

//
mongoose.connect(db,{
    useUnifiedTopology: true,
    useNewUrlParser: true
    }).then(()=>{
        console.log(`Database is Connected |bmst`)
    }).catch((err)=>{
        console.log(err)
    })




