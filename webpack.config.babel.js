import 'babel-polyfill';
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import pkg from './package.json';

export default () => {
  const DEBUG = process.env.NODE_ENV !== 'production';

  return {
    ...(DEBUG ? { performance: { hints: false } } : {}),

    devtool: 'source-map',

    entry: {
      client: ['babel-polyfill', './src/client.js'],
    },

    output: {
      path: path.join(__dirname, 'dist'),
      filename: DEBUG ? '[name].js?[chunkhash]' : '[name].[chunkhash].js',
      chunkFilename: DEBUG ? '[name].[id].js?[chunkhash]' : '[name].[id].[chunkhash].js',
      publicPath: '/',
      sourcePrefix: '  ',
    },

    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      modules: ['node_modules'],
      alias: {
        underscore: path.join('lodash', 'lodash.js'),
      },
    },

    cache: DEBUG,

    target: 'web',

    stats: {
      colors: true,
      reasons: DEBUG,
      hash: false,
      version: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      cached: false,
      cachedAssets: false,
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: [path.join(__dirname, 'src')],
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: path.join(__dirname, 'tmp', 'babel'),
                babelrc: false,
                presets: [
                  ['env', { targets: { browsers: pkg.browserslist, forceAllTransforms: true }, modules: false, useBuiltIns: false, debug: false }],
                  ['react', { pragma: 'h', development: DEBUG }],
                ],
                plugins: [
                  'transform-class-properties',
                  'transform-object-rest-spread',
                ],
              },
            },
          ],
        }, {
          test: /\.styl$/,
          include: [path.join(__dirname, 'src')],
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
              loader: 'css-loader',
              options: { sourceMap: false, minimize: !DEBUG },
            }, {
              loader: 'stylus-loader',
              options: { import: ['~nib/index'] },
            }],
          }),
        }, {
          test: /\.pug$/,
          include: [path.join(__dirname, 'src')],
          use: [
            { loader: 'pug-loader' },
          ],
        }, {
          test: /\.(png|jpe?g|gif|svg)$/,
          include: [path.join(__dirname, 'src')],
          use: [{
            loader: 'url-loader',
            options: { name: DEBUG ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]', limit: 1000 },
          }],
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({ template: 'src/index.pug' }),
      new ExtractTextPlugin(DEBUG ? '[name].css' : '[name]-[hash].css'),
      new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', minChunks: (module) => /node_modules/.test(module.resource) }),
      ...DEBUG ? [] : [new webpack.optimize.ModuleConcatenationPlugin()],
      ...DEBUG ? [] : [new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: { screw_ie8: true, warnings: false, unused: true, dead_code: true },
        mangle: { screw_ie8: true },
        output: { comments: false, screw_ie8: true },
      })],
    ],

    watchOptions: {
			ignored: /node_modules/,
		},

    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },

    devServer: {
      host: '0.0.0.0',
      contentBase: 'dist',
    },
  };
};
