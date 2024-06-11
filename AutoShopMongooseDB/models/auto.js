const {Schema,model}=require('mongoose')

const auto = new Schema({
    title:{
        type: String,
        required: true
    },
    price:{
        type:Number,
        required:true
    },
    img:String
})

module.exports=model('Auto',auto)