const express = require('express');
const router = express.Router();

const Task = require('../models/task');

//CREATE - POST
router.post('/', async(req, res) => {
    const { title, description } = req.body;
    const task = new Task({ title, description })
    console.log('Esto se almacenara en mongobd', task);
    await task.save();

    res.json({ status: 'Task saved' });

});

//READ - GET
router.get('/', async(req, res) => {
    const tasks = await Task.find();
    console.log('Hello I am your database', tasks);
    res.json(tasks);
});

//READ A SINGLE TASK - STILL GET

router.get('/:id', async(req, res) => {
    try {
        const singleTask = await Task.findById(req.params.id);
        res.status(200).json(singleTask)
    } catch (e) {
        console.error(e);
    }
})

//UPDATE - PUT
router.put('/:id', async(req, res) => {
    const { title, description } = req.body;
    const newTask = { title, description };
    await Task.findByIdAndUpdate(req.params.id, newTask);
    res.json({ status: 'Task updated' });
});

//DELETE - DELETE

router.delete('/:id', async(req, res) => {
    await Task.findByIdAndRemove(req.params.id);
    res.json({ status: 'Task deleted' });
})

module.exports = router;