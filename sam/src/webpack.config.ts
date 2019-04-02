import * as path from 'path';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { Configuration } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const config: Configuration = {
    entry: {
        addItem: ['./src/source-map-install.ts', './src/add-item.ts'],
        listItems: ['./src/source-map-install.ts', './src/list-items.ts']
    },
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        libraryTarget: 'commonjs',
        filename: '[name]/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        plugins: [new TsconfigPathsPlugin({})]
    },
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: 'stats.report.html',
            openAnalyzer: false
        })
    ],
    externals: { 'aws-sdk': 'aws-sdk' },
    mode: 'development',
    target: 'node'
};
module.exports = config;
