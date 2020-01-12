//used to build absolute output dir path
const path = require('path');

module.exports = {
    mode: 'development',
    //specify main project file
    entry: './src/main.ts',
    //specify output should be a single file and where it should be generated
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist'
    },
    //used to debug ts code when developing
    devtool: 'inline-source-map',
    module: {
        //tell webpack what files it should look for (*.ts) and which loader should be used. Optionally node_modules have been excluded
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        //tell webpack what extensions files in imports have, by default its *.js
        extensions: ['.ts', '.js']
    }
};