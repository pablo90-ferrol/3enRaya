const path = require('path')

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        library: 'TresEnRaya'
    },
    devServer: {
        contentBase: path.join(__dirname, 'public')
    }
}