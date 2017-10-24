var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: "./src/js/Main.js",
    output: { path: `${__dirname}/dist`, filename: 'game.js',library: 'basketball' },
    module:
    {
        loaders: [
            {
                test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new CopyWebpackPlugin([
            { from:`${__dirname}/src/html` } 
        ])
    ]
}