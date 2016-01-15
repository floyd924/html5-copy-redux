var path = require('path');

module.exports = {
    entry: [
        './app/scripts/bootstrap.js'
    ],
    output: {
        path: './build',
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                include: path.resolve(__dirname, "app/scripts"),
                query: { presets: ['es2015'] }
            },
            {
                test: /\.html$/,
                loader: 'html',
                include: path.resolve(__dirname, "app/scripts")
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass'],
                include: path.resolve(__dirname, "app/scripts")
            }
        ]
    }
};