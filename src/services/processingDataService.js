function processPopulationData(data) {
    const statePopulation = {};

    try {
        data.features.forEach(feature => {
            const { STATE_NAME, POPULATION } = feature.attributes;
            if (STATE_NAME) {
                statePopulation[STATE_NAME] = (statePopulation[STATE_NAME] || 0) + POPULATION;
            }
        });
        return statePopulation;
    } catch (error) {
        console.error("Error processing population data:", error.message);
        throw error;  
    }
}

module.exports = { processPopulationData };