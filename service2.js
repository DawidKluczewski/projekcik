const mysql = require('mysql2/promise');
const config = require('./config');

async function query(sql, params) {
    const connection = await mysql.createConnection(config.db)
    const [results, ] = await connection.execute(sql, params);

    return results;
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
    wypozyczenia: {
        all: wypozyczenia_all,
        single: wypozyczenia_single,
        create: wypozyczenia_create,
        delete: wypozyczenia_delete,
        update: wypozyczenia_update
    }
};