const express = require('express');
const router1 = express.Router();
const service1 = require('./service1');

router1.get( '/', async function(req, res, next ) {
        try {
            res.json(await service1.samochody.all());
        }catch(err){
            console.error('No sorry, samochodów nie mamy', err.message);
            next(err);
        }
    }
);

router1.get('/:idsamochody', async function(req, res, next){
    try {
        res.json(await service1.samochody.single(req.params.idsamochody));
    } catch(err) {
        console.error('Nie ma samochodu', err.message);
        next(err);
    }
});

router1.post('/', async function(req, res, next){
    try {
        res.json(await service1.samochody.create(req.body));
    } catch (err){
        console.error('Nie udało się dopisać samochodu', err.message);
        next(err);
    }
});

router1.put('/:idsamochody', async function(req, res, next){
    try {
        res.json(await service1.samochody.update(req.params.idsamochody, req.body));
    } catch (err){
        console.error('Nie udało się zmienić samochodu', err.message);
        next(err);
    }
});

router1.delete('/:idsamochody', async function(req, res, next){
    try{
        res.json(await service1.samochody.delete(req.params.idsamochody));
    }catch(err){
        console.error('Nie usunę samochodu', err.message);
        next(err);
    }
});

module.exports = router1;