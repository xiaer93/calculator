//webpack.config
module.exports={
    entry:{
        main:"./src/main.js",
    },
    output:{
        filename: '[name].js',
        path:__dirname+'/build',
    },
    module:{
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
    }
};