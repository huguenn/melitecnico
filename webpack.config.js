var path = require("path");
module.exports = {
    entry: "./src/app.js",
    mode: "production",
    output: {
        path: path.join(__dirname, "public"),
        filename: "bundle.js", // this is the compiled final javascript file which we will include in the index.html
        publicPath: "/"
    },
    module: {
        rules: [
            {
                loader: "babel-loader",
                test: /\.(jsx|js)?$/,
                exclude: /node_modules/
            },
            {
                test: /(\.css|.scss)$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"]
            }
        ]
    },
    devtool: false,
    devServer: {
        contentBase: path.join(__dirname, "public"),
        historyApiFallback: true // this prevents the default browser full page refresh on form submission and link change
    }
};
