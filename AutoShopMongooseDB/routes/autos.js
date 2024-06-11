const { Router } = require('express');
const Auto = require('../models/auto');
const router = Router();

// GET /autos - отображение списка автоов
router.get('/', async (req, res) => {
  try {
    const autos = await Auto.find();
    res.render('autos', {
      title: 'Авто',
      isAutos: true,
      autos
    });
  } catch (error) {
    console.error('Error fetching autos:', error);
    res.status(500).send('Internal Server Error');
  }
});

// GET /autos/:id/edit - страница редактирования автоа
router.get('/:id/edit', async (req, res) => {
  try {
    if (!req.query.allow) {
      return res.redirect('/');
    }
    const auto = await Auto.findById(req.params.id);
    res.render('auto-edit', {
      title: `Редактировать ${auto.title}`,
      auto
    });
  } catch (error) {
    console.error('Error fetching auto for edit:', error);
    res.status(500).send('Internal Server Error');
  }
});

// POST /autos/edit - обновление автоа
router.post('/edit', async (req, res) => {
  try {
    const { id } = req.body;
    delete req.body.id;
    await Auto.findByIdAndUpdate(id, req.body);
    res.redirect('/autos');
  } catch (error) {
    console.error('Error updating auto:', error);
    res.status(500).send('Internal Server Error');
  }
});

// GET /autos/:id - отображение информации о автое
router.get('/:id', async (req, res) => {
  try {
    const auto = await Auto.findById(req.params.id);
    res.render('auto', {
      layout: 'empty',
      title: `Авто ${auto.title}`,
      auto
    });
  } catch (error) {
    console.error('Error fetching auto:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
