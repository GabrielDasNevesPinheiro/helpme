// webpack.config.js
module.exports = {
    module: {
        rules: [
            {
                test: /\.(win32-x64-msvc\.node)$/,
                loader: 'ignore-loader'
            }
        ]
    }
};
