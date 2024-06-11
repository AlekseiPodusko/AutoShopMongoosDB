const{Router}=require('express')
const Fav = require('../models/fav')
const Auto = require('../models/auto')
const router = Router()

router.post('/add',async (req,res)=>{
    const auto = await Auto.getById(req.body.id)
    await Fav.add(auto)
    res.redirect('/fav')
})

router.delete('/remove/:id',async(req,res)=>{
    const fav = await Fav.remove(req.params.id)
    res.status(200).json(fav)
})

router.get('/', async (req,res)=>{
    const fav = await Fav.fetch()
    res.render('fav',{
        title:'Фаворит', 
        isFav:true,
        auto:fav.autos,
        price:fav.price
    })
})

module.exports=router