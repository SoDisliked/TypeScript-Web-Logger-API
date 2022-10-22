const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exprots = {
    entry: 'index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index_bundle.js',
    },
    plugins: [new HTMLWebpackPlugin()],
},