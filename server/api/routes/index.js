const path = require("path");
const meliService = require("../services/meli-service");
const resultsTransformer = require("../transformers/results-transformer");
const detailTransformer = require("../transformers/detail-transformer");
global.appRoot = path.join(__dirname, "..", "..", "/public/index.html");

module.exports = function(app) {
    app.get("/api/items", (req, res) => {
        meliService
            .getResults(req.query.search)
            .then(response => {
                res.send(resultsTransformer.transform(response.data));
            })
            .catch(error => {
                console.log(error);
            });
    });

    app.get("/api/items/:id", (req, res) => {
        Promise.all([
            meliService.getItemById(req.params.id),
            meliService.getItemDescription(req.params.id)
        ])
            .then(function(response) {
                if (response[0].data && response[1].data) {
                    res.send(detailTransformer.transform(response));
                } else {
                    throw new Error("Missing product information");
                }
            })
            .catch(function(err) {
                if (
                    err.response.data.status &&
                    err.response.data.status === 404
                ) {
                    res.send(err.response.data);
                }
                console.log(err.response.data);
            });
    });
};
