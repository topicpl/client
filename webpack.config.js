const path = require('path');

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.join(__dirname, '/public'),
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: path.join(__dirname, '/public'),
        historyApiFallback: true,
        inline: true,
        port: 3001,
        hot: true,
    },
    module: {
        rules: [{
            test: /\.js|jsx$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            resolve: {
                extensions: ['.js', '.jsx'],
            },
            query: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
            },
        }, ],
    },
};