const { Router } = require('express');
const Auto = require('../models/auto');
const router = Router();

router.get('/', (req, res) => {
    res.render('add', {
        title: 'Добавить авто',
        isAdd: true
    });
});

router.post('/', async (req, res) => {
    const auto = new Auto({
        title: req.body.title,
        price: req.body.price, 
        img: req.body.img
});
try { 
    await auto.save();
    res.redirect('/autos')
} catch (e){
    console.log(e)
}})

module.exports = router;
