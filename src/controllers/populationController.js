const { fetchPopulationDataFromDb } = require('../services/dbService');

async function getPopulation(req, res) {
    try {
        const stateName = req.query.stateName || '';
        const data = await fetchPopulationDataFromDb(stateName);
        if (data == undefined){
            res.status(404).json({ error: 'Resource not found' });
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { getPopulation };