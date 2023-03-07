const router = require('express').Router()
const { models: { Bug, Project}} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.findAll({include: Bug})
    res.json(projects)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const projectId = req.params.id
    const project = await Project.findByPk(req.params.id, {include: Bug });
    // , where: {
    //   userId: req.params.id
    // }
    res.json(project);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Project.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id)
    res.send(await project.update(req.body));
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id);
    await project.destroy();
    res.send(project);
  } catch (error) {
    next(error);
  }
});
