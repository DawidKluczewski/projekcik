const mysql = require('mysql2/promise');
const config = require('./config');

async function query(sql, params) {
    const connection = await mysql.createConnection(config.db)
    const [results, ] = await connection.execute(sql, params);

    return results;
}

async function specyfikacje_samochodu_all(){
    const rows = await query(
        'SELECT * from specyfikacje_samochodu'
    )
    return !rows ? [] : rows;
}

async function specyfikacje_samochodu_create(specyfikacja_samochodu){
    const result = await query(`
        INSERT INTO specyfikacje_samochodu
        (kolor, silnik, przebieg, moc_silnika, naped, skrzynia_biegow) 
        VALUES 
        ('${specyfikacja_samochodu.kolor}', '${specyfikacja_samochodu.silnik}', '${specyfikacja_samochodu.przebieg}',
         '${specyfikacja_samochodu.moc_silnika}', '${specyfikacja_samochodu.naped}', '${specyfikacja_samochodu.skrzynia_biegow}');
    `
    );
    return result.affectedRows ? {idklienci: result.insertId} : 'Nie stworzono rekordu specyfikacji samochodu';
}

async function specyfikacje_samochodu_delete(idspecyfikacje_samochodu) {
    const rows = await query(`
        DELETE FROM specyfikacje_samochodu
        WHERE idspecyfikacje_samochodu = ${idspecyfikacje_samochodu}
    `
    );
    return !rows ? [] : rows;
}

async function specyfikacje_samochodu_single(idspecyfikacje_samochodu) {
    const rows = await query(`
        SELECT idspecyfikacje_samochodu, kolor, silnik, przebieg, moc_silnika, naped, skrzynia_biegow
        FROM specyfikacje_samochodu
        WHERE idspecyfikacje_samochodu = ${idspecyfikacje_samochodu}
    `
    );
    return !rows ? [] : rows;
}

async function specyfikacje_samochodu_update(idspecyfikacje_samochodu, specyfikacja_samochodu){
    let updateArr = [];
    if(specyfikacja_samochodu.kolor) updateArr.push(`kolor = '${specyfikacja_samochodu.kolor}'`);
    if(specyfikacja_samochodu.silnik) updateArr.push(`silnik = '${specyfikacja_samochodu.silnik}'`);
    if(specyfikacja_samochodu.przebieg) updateArr.push(`przebieg = '${specyfikacja_samochodu.przebieg}'`);
    if(specyfikacja_samochodu.moc_silnika) updateArr.push(`moc_silnika = '${specyfikacja_samochodu.moc_silnika}'`);
    if(specyfikacja_samochodu.naped) updateArr.push(`naped = '${specyfikacja_samochodu.naped}'`);
    if(specyfikacja_samochodu.skrzynia_biegow) updateArr.push(`skrzynia_biegow = '${specyfikacja_samochodu.skrzynia_biegow}'`);

    const result = await query(`
        UPDATE specyfikacje_samochodu
        SET ${updateArr.join(', ')}
        WHERE idspecyfikacje_samochodu=${idspecyfikacje_samochodu}
    `
    );
    return result.affectedRows ? {idspecyfikacje_samochodu: result.insertId} : 'Nie zmieniono żadnego rekordu specyfikacji samochodu';
}

module.exports = {
    query,
    specyfikacje_samochodu: {
        all: specyfikacje_samochodu_all,
        single: specyfikacje_samochodu_single,
        create: specyfikacje_samochodu_create,
        delete: specyfikacje_samochodu_delete,
        update: specyfikacje_samochodu_update
    }
};