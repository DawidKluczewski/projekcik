const express = require('express');
const router3 = express.Router();
const service3 = require('./service3');

router3.get( '/', async function(req, res, next ) {
        try {
            res.json(await service3.specyfikacje_samochodu.all());
        }catch(err){
            console.error('No sorry, specyfikacji samochodu nie mamy', err.message);
            next(err);
        }
    }
);

router3.get('/:idspecyfikacje_samochodu', async function(req, res, next){
    try {
        res.json(await service3.specyfikacje_samochodu.single(req.params.idspecyfikacje_samochodu));
    } catch(err) {
        console.error('Nie ma specyfikacji samochodu', err.message);
        next(err);
    }
});

router3.post('/', async function(req, res, next){
    try {
        res.json(await service3.specyfikacje_samochodu.create(req.body));
    } catch (err){
        console.error('Nie udało się dopisać specyfikacji samochodu', err.message);
        next(err);
    }
});

router3.put('/:idspecyfikacje_samochodu', async function(req, res, next){
    try {
        res.json(await service3.specyfikacje_samochodu.update(req.params.idspecyfikacje_samochodu, req.body));
    } catch (err){
        console.error('Nie udało się zmienić specyfikacji samochodu', err.message);
        next(err);
    }
});

router3.delete('/:idspecyfikacje_samochodu', async function(req, res, next){
    try{
        res.json(await service3.specyfikacje_samochodu.delete(req.params.idspecyfikacje_samochodu));
    }catch(err){
        console.error('Nie usunę specyfikacji samochodu', err.message);
        next(err);
    }
});

module.exports = router3;