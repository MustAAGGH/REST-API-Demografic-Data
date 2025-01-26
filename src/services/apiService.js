async function fetchDataFromAPI() {
    const DATA_SOURCE_URL = "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/USA_Census_Counties/FeatureServer/0/query";
    
    const params = new URLSearchParams({
        where: '1=1',
        outFields: 'population,state_name',
        returnGeometry: 'false',
        f: 'json'
    });

    try {
        const response = await fetch(`${DATA_SOURCE_URL}?${params.toString()}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error fetching data from API:", error.message);
        throw error;
    }
}


module.exports = { fetchDataFromAPI };