const Router = require('express');
const Dog = require('./../models/Dog.js')

// starting in express v5, errors thrown by asynchronous code will automatically be passed to next so the error can be handled by express.
// https://expressjs.com/en/guide/error-handling.html
module.exports = Router()
    .post('/', async (req, res, next) => {
        try{
            const newDog = await Dog.insert({...req.body});
            res.send(newDog);
        } catch (err) {
            next(err);
        }
    })
    .get('/:id', async (req, res, next) => {
        try{     
            const { id } = req.params;
            const selectedDog = await Dog.getById(id)
            res.send(selectedDog)
        } catch (err) {
            next(err);
        }
    })
    .get('/', async (req, res, next) => {
        try{     
            const allDogs = await Dog.getAll();
            res.send(allDogs);
        } catch (err) {
            next(err);
        }
    })
    .patch('/:id', async (req, res, next) => {
        try{     
            const { id } = req.params;
            const updatedDog = await Dog.updateById(id, {...req.body})
            res.send(updatedDog);
        } catch (err) {
            next(err);
    }
    })
    .delete('/:id', async (req, res, next) => {
        try{     
            const { id } = req.params;
            const dog = await Dog.deleteById(id);
            res.send(dog);
        } catch (err) {
            next(err);
        }
    })