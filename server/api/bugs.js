const router = require('express').Router()
const { models: { Bug, User, Project}} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const bugs = await Bug.findAll({include: [User, Project]})
    res.json(bugs)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const bugId = req.params.id
    const bug = await Bug.findByPk(req.params.id, {include: [User, Project]});
    // , where: {
    //   userId: req.params.id
    // }
    res.json(bug);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Bug.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const bug = await Bug.findByPk(req.params.id)
    res.send(await bug.update(req.body));
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const bug = await Bug.findByPk(req.params.id);
    await bug.destroy();
    res.send(bug);
  } catch (error) {
    next(error);
  }
});
