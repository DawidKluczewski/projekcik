const express = require('express');
const router = express.Router();
const service = require('./service');

router.get( '/', async function(req, res, next ) {
    try {
        res.json(await service.klienci.all());
    }catch(err){
        console.error('No sorry, klientów nie mamy', err.message);
        next(err);
        }
    }
);

router.get('/:idklienci', async function(req, res, next){
        try {
            res.json(await service.klienci.single(req.params.idklienci));
        } catch(err) {
            console.error('Nie ma klienta', err.message);
            next(err);
    }
});

router.post('/', async function(req, res, next){
    try {
        res.json(await service.klienci.create(req.body));
    } catch (err){
        console.error('Nie udało się dopisać klienta', err.message);
        next(err);
    }
});

router.put('/:idklienci', async function(req, res, next){
    try {
        res.json(await service.klienci.update(req.params.idklienci, req.body));
    } catch (err){
        console.error('Nie udało się zmienić ucznia', err.message);
        next(err);
    }
});

router.delete('/:idklienci', async function(req, res, next){
    try{
        res.json(await service.klienci.delete(req.params.idklienci));
    }catch(err){
        console.error('Nie usunę klienta', err.message);
        next(err);
    }
});

module.exports = router;