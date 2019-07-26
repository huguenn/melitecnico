const express = require("express");
const bodyParser = require("body-parser");
const webpack = require("webpack");
const middleware = require("webpack-dev-middleware");
const webpackOptions = require("../webpack.config.js");
const compiler = webpack(webpackOptions);
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/static", express.static("public"));
app.use("/images", express.static("src/assets"));
app.use(middleware(compiler, {}));

require("./api/routes")(app, {});

app.get("/*", (req, res) => {
    res.sendFile(webpackOptions.output.path + "/index.html");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
