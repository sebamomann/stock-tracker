const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: [path.resolve(__dirname, 'src')]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
                include: [path.resolve(__dirname, 'src')]
            },
        ],
    },
    resolve: {
        fallback: {
            "util": require.resolve("util/"),
            "assert": require.resolve("assert/"),
            "https": require.resolve("https-browserify"),
            "http": require.resolve("stream-http"),
            "buffer": require.resolve("buffer/"),
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
            "zlib": require.resolve("browserify-zlib"),
            "path": require.resolve("path-browserify"),
            fs: false,
            net: false,
            tls: false,
        },
        extensions: ['.ts', '.js', '.scss']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    devServer: {
        port: 3000,
        disableHostCheck: true,
        hot: true,
        historyApiFallback: true,
        contentBase: './public',
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        })
    ],
}
