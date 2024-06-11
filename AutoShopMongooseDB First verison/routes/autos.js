const{Router}=require('express')
const Auto = require('../models/auto')
const router = Router()

router.get('/',async(req,res)=>{
    const autos =await Auto.find()
    res.render('autos',{
        title:'Авто',
        isAutos: true,
        autos
    })
})

router.get('/:id/edit',async (req,res)=>{
    if(!req.query.allow){

        return res.redirect('/')
    }
    const auto = await Auto.findById(req.params.id)

    res.render('auto-edit',{
        title:`Редактировать ${auto.title}`,
        auto
    })
})

router.post('/edit',async(req,res)=>{
    const{id}=req.body
    delete req.body.id
    await Auto.findByIdAndUpdate(id, req.body)
    res.redirect('/autos')
})

router.get('/:id',async(req,res)=>{
    const auto = await Auto.findById(req.params.id)
    res.render('auto',{
        layout:'empty',
        title:`Авто ${auto.title}`,
        auto
    })
})



module.exports=router