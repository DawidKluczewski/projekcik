const mysql = require('mysql2/promise');
const config = require('./config');

async function query(sql, params) {
    const connection = await mysql.createConnection(config.db)
    const [results, ] = await connection.execute(sql, params);

    return results;
}

async function klienci_all(){
    const rows = await query(
        'SELECT * from klienci'
)
    return !rows ? [] : rows;
}

async function klienci_create(klient){
    const result = await query(`
        INSERT INTO klienci
        (imie, nazwisko, pesel, miejsce_zamieszkania, numer_telefonu) 
        VALUES 
        ('${klient.imie}', '${klient.nazwisko}', '${klient.pesel}', '${klient.miejsce_zamieszkania}', '${klient.numer_telefonu}');
    `
    );
    return result.affectedRows ? {idklienci: result.insertId} : 'Nie stworzono rekordu klienta';
}

async function klienci_delete(idklienci) {
    const rows = await query(`
        DELETE FROM klienci
        WHERE idklienci = ${idklienci}
    `
);
    return !rows ? [] : rows;
}

async function klienci_single(idklienci) {
    const rows = await query(`
        SELECT idklienci, imie, nazwisko, pesel, miejsce_zamieszkania, numer_telefonu, data_wpisu
        FROM klienci
        WHERE idklienci = ${idklienci}
    `
    );
    return !rows ? [] : rows;
}

async function klienci_update(idklienci, klient){
    let updateArr = [];
    let timestamp = new Date();
    if(klient.imie) updateArr.push(`imie = '${klient.imie}'`);
    if(klient.nazwisko) updateArr.push(`nazwisko = '${klient.nazwisko}'`);
    if(klient.pesel) updateArr.push(`pesel = '${klient.pesel}'`);
    if(klient.miejsce_zamieszkania) updateArr.push(`miejsce_zamieszkania = '${klient.miejsce_zamieszkania}'`);
    if(klient.numer_telefonu) updateArr.push(`numer_telefonu = '${klient.numer_telefonu}'`);
    if(updateArr.length > 0) {
        updateArr.push(`data_wpisu = '${timestamp.getFullYear()}-${timestamp.getMonth()+1}-${timestamp.getDate()}'`);
    }

    const result = await query(`
        UPDATE klienci
        SET ${updateArr.join(', ')}
        WHERE idklienci=${idklienci}
    `
    );
    return result.affectedRows ? {idklienci: result.insertId} : 'Nie zmieniono żadnego rekordu klienta';
}


async function samochody_all(){
    const rows = await query(
        'SELECT * from samochody'
)
    return !rows ? [] : rows;
}

async function samochody_create(samochod){
    const result = await query(`
        INSERT INTO samochody
        (marka, model, rok_produkcji, cena_wypozyczenia) 
        VALUES 
        ('${samochod.marka}', '${samochod.model}', '${samochod.rok_produkcji}', '${samochod.cena_wypozyczenia}');
    `
    );
    return result.affectedRows ? {idsamochody: result.insertId} : 'Nie stworzono rekordu samochodu';
}

async function samochody_delete(idsamochody) {
    const rows = await query(`
        DELETE FROM samochody
        WHERE idsamochody = ${idsamochody}
    `
);
    return !rows ? [] : rows;
}

async function samochody_single(idsamochody) {
    const rows = await query(`
        SELECT idsamochody, marka, model, rok_produkcji, cena_wypozyczenia, data_wpisu
        FROM samochody
        WHERE idsamochody = ${idsamochody}
    `
    );
    return !rows ? [] : rows;
}

async function samochody_update(idsamochody, samochod){
    let updateArr = [];
    let timestamp = new Date();
    if(samochod.marka) updateArr.push(`marka = '${samochod.marka}'`);
    if(samochod.model) updateArr.push(`model = '${samochod.model}'`);
    if(samochod.rok_produkcji) updateArr.push(`rok_produkcji = '${samochod.rok_produkcji}'`);
    if(samochod.cena_wypozyczenia) updateArr.push(`cena_wypozyczenia = '${samochod.cena_wypozyczenia}'`);
    if(updateArr.length > 0) {
        updateArr.push(`data_wpisu = '${timestamp.getFullYear()}-${timestamp.getMonth()+1}-${timestamp.getDate()}'`);
    }

    const result = await query(`
        UPDATE samochody
        SET ${updateArr.join(', ')}
        WHERE idsamochody=${idsamochody}
    `
    );
    return result.affectedRows ? {idsamochody: result.insertId} : 'Nie zmieniono żadnego rekordu samochodu';
}

module.exports = {
    query,
    klienci: {
        all: klienci_all,
        single: klienci_single,
        create: klienci_create,
        delete: klienci_delete,
        update: klienci_update
    },

    samochody: {
        all: samochody_all,
        single: samochody_single,
        create: samochody_create,
        delete: samochody_delete,
        update: samochody_update
    },

    wypozyczenia: {
        all: wypozyczenia_all,
        single: wypozyczenia_single,
        create: wypozyczenia_create,
        delete: wypozyczenia_delete,
        update: wypozyczenia_update
    }
};