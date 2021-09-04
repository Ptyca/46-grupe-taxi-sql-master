const mysql = require('mysql2/promise');

const app = {}

app.init = async () => {
    // prisijungti prie duomenu bazes
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'taxi',
    });

    let sql = '';
    let rows = [];

    //1.ispausdint kiek buvo kelioniu 
    sql = 'SELECT * FROM `trips`';

    [rows] = await connection.execute(sql);
    const tripsCount = rows.length;
    console.log(`Visi taksistai bendrai ivykde ${tripsCount} keliones.`);

    //2.visu taksistu vardus
    sql = 'SELECT `driver` FROM `trips`';
    [rows] = await connection.execute(sql);

    let driverNames = [];
    for (let index = 0; index < rows.length; index++) {
        const soferis = rows[index].driver;
        if (!driverNames.includes(soferis)) {
            driverNames.push(soferis);
        }
    }
    console.log(`Taksistais dirba: ${driverNames.join(', ')}.`);

    // 3. isspausdinti koki atstuma nuvaziavo visu kelioniu metu.

    sql = 'SELECT `distance` FROM `trips`';
    [rows] = await connection.execute(sql);
    let driveDistance = 0;
    for (let i = 0; i < rows.length; i++) {
        driveDistance += +rows[i].distance;
    }
    console.log(`Visu kelioniu metu nuvaziuota ${driveDistance} km.`);

    //4. Isspausdinti, koks vidutinis Jono ivertinimas

    sql = 'SELECT `rating` FROM `trips` WHERE `driver` LIKE "Jonas"';

    [rows] = await connection.execute(sql);
    let vairuotojoKeliones = 0;
    for (let i = 0; i < rows.length; i++) {
        vairuotojoKeliones += +rows[i].rating;
    }
    const vidurkis = vairuotojoKeliones / rows.length;
    console.log(`Jono ivertinimas yra ${vidurkis} zvaigzdutes.`)
    // 5. Spausdinti , kokia yra vidutine kelioniu kaina

}
app.init();

module.exports = app;