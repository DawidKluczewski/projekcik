const express = require('express');
const router = express.Router();
const service = require('./service2');




router.get( '/', async function(req, res, next ) {
    try {
        res.json(await service.wypozyczenia.all());
    }catch(err){
        console.error('No sorry, wypozyczen nie mamy', err.message);
        next(err);
        }
    }
);

router.get('/:idwypozyczenia', async function(req, res, next){
        try {
            res.json(await service.wypozyczenia.single(req.params.idwypozyczenia));
        } catch(err) {
            console.error('Nie ma wypozyczenia', err.message);
            next(err);
    }
});

router.post('/', async function(req, res, next){
    try {
        res.json(await service.wypozyczenia.create(req.body));
    } catch (err){
        console.error('Nie udało się dopisać wypozyczenia', err.message);
        next(err);
    }
});

router.put('/:idwypozyczenia', async function(req, res, next){
    try {
        res.json(await service.wypozyczenia.update(req.params.idwypozyczenia, req.body));
    } catch (err){
        console.error('Nie udało się zmienić wypozyczenia', err.message);
        next(err);
    }
});

router.delete('/:idwypozyczenia', async function(req, res, next){
    try{
        res.json(await service.wypozyczenia.delete(req.params.idwypozyczenia));
    }catch(err){
        console.error('Nie usunę wypozyczenia', err.message);
        next(err);
    }
});

module.exports = router;