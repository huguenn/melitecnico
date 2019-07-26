const axios = require("axios");
const querystring = require("querystring");

axios.interceptors.request.use(request => {
    let queryString = querystring.stringify(request.params);
    queryString = queryString.length > 0 ? `?${queryString}` : queryString;
    request.url = encodeURI(request.url).replace("%E2%80%8B", "");
    console.log("Starting Request", request.url + queryString);
    return request;
});

const getResults = query => {
    try {
        return axios.get("https://api.mercadolibre.com/sites/MLA/search", {
            params: {
                q: query
            }
        });
    } catch (error) {
        console.error(error);
    }
};

const getItemById = id => {
    try {
        return axios.get(`https://api.mercadolibre.com/items/​${id}`);
    } catch (error) {
        console.error(error);
    }
};

const getItemDescription = id => {
    try {
        return axios.get(
            `https://api.mercadolibre.com/items/​${id}/description`
        );
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    getResults: getResults,
    getItemById: getItemById,
    getItemDescription: getItemDescription
};
