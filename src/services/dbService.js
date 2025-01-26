const mysql = require('mysql2/promise');
const dbConfig = require('../config/dbConfig');

async function fetchPopulationDataFromDb(stateName) {
    let query = 'SELECT state_name, population, last_updated FROM StatePopulation';
    const params = [];

    if (stateName) {
        query += ' WHERE state_name = ?';
        params.push(stateName);
    }

    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(query, params);
        if (rows.length == 0){
            return;
        }
        const formattedRows = rows.map(row => {
            const date = new Date(row.last_updated);
            const formattedDate = date.toLocaleString('sv-SE');
            return {
                ...row,
                last_updated: formattedDate
            };
        });

        return formattedRows;
        
    } catch (error) {
        console.error("Error fetching population data from database:", error.message);
        throw error;  
    } finally {
        if (connection) {
            await connection.end();  
        }
    }
}

async function savePopulationData(statePopulation) {
    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);

        for (const [stateName, population] of Object.entries(statePopulation)) {
            const [rows] = await connection.execute(`
                INSERT INTO StatePopulation (state_name, population, last_updated)
                VALUES (?, ?, NOW())
                ON DUPLICATE KEY UPDATE population = VALUES(population), last_updated = NOW();
            `, [stateName, population]);
        }
        console.log('Data is successfully saved on database.');
    } catch (error) {
        console.error("Error saving population data to database:", error.message);
        throw error;  
    } finally {
        if (connection) {
            await connection.end();  
        }
    }
}

module.exports = { fetchPopulationDataFromDb, savePopulationData };