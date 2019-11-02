const path = require("path")
const webpack = require("webpack")
const root = path.resolve(__dirname, "src", "app")

const config = {
    entry: {
        bundle: `${root}/index.js`
    },
    resolve: {
        extensions: [".js"]
    },
    output: {
        path: path.resolve(__dirname, "public")
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                }
            }
        }]
    }
}

module.exports = config