const express = require('express');
const router2 = express.Router();
const service2 = require('./service2');

router2.get( '/', async function(req, res, next ) {
    try {
        res.json(await service2.wypozyczenia.all());
    }catch(err){
        console.error('No sorry, wypozyczen nie mamy', err.message);
        next(err);
        }
    }
);

router2.get('/:idwypozyczenia', async function(req, res, next){
        try {
            res.json(await service2.wypozyczenia.single(req.params.idwypozyczenia));
        } catch(err) {
            console.error('Nie ma wypozyczenia', err.message);
            next(err);
    }
});

router2.post('/', async function(req, res, next){
    try {
        res.json(await service2.wypozyczenia.create(req.body));
    } catch (err){
        console.error('Nie udało się dopisać wypozyczenia', err.message);
        next(err);
    }
});

router2.put('/:idwypozyczenia', async function(req, res, next){
    try {
        res.json(await service2.wypozyczenia.update(req.params.idwypozyczenia, req.body));
    } catch (err){
        console.error('Nie udało się zmienić wypozyczenia', err.message);
        next(err);
    }
});

router2.delete('/:idwypozyczenia', async function(req, res, next){
    try{
        res.json(await service2.wypozyczenia.delete(req.params.idwypozyczenia));
    }catch(err){
        console.error('Nie usunę wypozyczenia', err.message);
        next(err);
    }
});

module.exports = router2;