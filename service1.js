const mysql = require('mysql2/promise');
const config = require('./config');

async function query(sql, params) {
    const connection = await mysql.createConnection(config.db)
    const [results, ] = await connection.execute(sql, params);

    return results;
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
    samochody: {
        all: samochody_all,
        single: samochody_single,
        create: samochody_create,
        delete: samochody_delete,
        update: samochody_update
    }
};