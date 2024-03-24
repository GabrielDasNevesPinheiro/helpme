// webpack.config.js
module.exports = {
    module: {
        rules: [
            {
                test: /\.(.node)$/,
                loader: 'ignore-loader'
            }
        ]
    }
};
