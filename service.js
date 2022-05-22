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

async function wypozyczenia_all(){
    const rows = await query(
        'SELECT * from wypozyczenia'
)
    return !rows ? [] : rows;
}

async function wypozyczenia_create(wypozyczenie){
    const result = await query(`
        INSERT INTO wypozyczenia
        (cena, data_wypozyczenia, data_zwrotu, okres_wypozyczenia) 
        VALUES 
        ('${wypozyczenie.cena}', '${wypozyczenie.data_wypozyczenia}', '${wypozyczenie.data_zwrotu}', '${wypozyczenie.okres_wypozyczenia}');
    `
    );
    return result.affectedRows ? {idwypozyczenia: result.insertId} : 'Nie stworzono rekordu wypozyczenia';
}

async function wypozyczenia_delete(idwypozyczenia) {
    const rows = await query(`
        DELETE FROM wypozyczenia
        WHERE idwypozyczenia = ${idwypozyczenia}
    `
);
    return !rows ? [] : rows;
}

async function wypozyczenia_single(idwypozyczenia) {
    const rows = await query(`
        SELECT idwypozyczenia, cena, data_wypozyczenia, data_zwrotu, okres_wypozyczenia, data_wpisu
        FROM wypozyczenia
        WHERE idwypozyczenia = ${idwypozyczenia}
    `
    );
    return !rows ? [] : rows;
}

async function wypozyczenia_update(idwypozyczenia, wypozyczenie){
    let updateArr = [];
    let timestamp = new Date();
    if(wypozyczenie.cena) updateArr.push(`cena = '${wypozyczenie.imie}'`);
    if(wypozyczenie.data_wypozyczenia) updateArr.push(`data_wypozyczenia = '${wypozyczenie.data_wypozyczenia}'`);
    if(wypozyczenie.data_zwrotu) updateArr.push(`data_zwrotu = '${wypozyczenie.data_zwrotu}'`);
    if(wypozyczenie.okres_wypozyczenia) updateArr.push(`okres_wypozyczenia = '${wypozyczenie.okres_wypozyczenia}'`);
    if(updateArr.length > 0) {
        updateArr.push(`data_wpisu = '${timestamp.getFullYear()}-${timestamp.getMonth()+1}-${timestamp.getDate()}'`);
    }

    const result = await query(`
        UPDATE wypozyczenia
        SET ${updateArr.join(', ')}
        WHERE idwypozyczenia=${idwypozyczenia}
    `
    );
    return result.affectedRows ? {idwypozyczenia: result.insertId} : 'Nie zmieniono żadnego rekordu wypozyczenia';
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

    wypozyczenia: {
        all: wypozyczenia_all,
        single: wypozyczenia_single,
        create: wypozyczenia_create,
        delete: wypozyczenia_delete,
        update: wypozyczenia_update
    }
};