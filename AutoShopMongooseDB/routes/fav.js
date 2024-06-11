const { Router } = require('express');
const Fav = require('../models/fav');
const Auto = require('../models/auto');
const router = Router();

router.post('/add', async (req, res) => {
  try {
    const auto = await Auto.findById(req.body.id);  // Исправлено на findById
    await Fav.add(auto);
    res.redirect('/fav');
  } catch (error) {
    console.error('Error adding auto to fav:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/remove/:id', async (req, res) => {
  try {
    const fav = await Fav.remove(req.params.id);
    res.status(200).json(fav);
  } catch (error) {
    console.error('Error removing auto from fav:', error);
    res.status(500).json({ error: 'Failed to remove auto from fav' });
  }
});

router.get('/', async (req, res) => {
  try {
    const fav = await Fav.fetch();
    res.render('fav', {
      title: 'Гараж',
      isFav: true,
      autos: fav.autos,
      price: fav.price
    });
  } catch (error) {
    console.error('Error fetching fav:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
