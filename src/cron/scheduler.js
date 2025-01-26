const cron = require('node-cron');
const { fetchDataFromAPI } = require('../services/apiService');
const { processPopulationData } = require('../services/processingDataService');
const { savePopulationData } = require('../services/dbService');


async function backgroundProcessing() {
    try {
        const data = await fetchDataFromAPI();  
        const statePopulation = processPopulationData(data);  
        await savePopulationData(statePopulation);  
    } catch (error) {
        console.error("Error during background processing:", error.message);
    }
}

async function startScheduler() {
    console.log('Running initial task...');
    await backgroundProcessing();

    // Schedule the task to run hourly
    cron.schedule('0 * * * *', async () => {
        console.log('Running scheduled task...');
        await backgroundProcessing();
    });
    console.log('Scheduler started.');
}

module.exports = { startScheduler };
