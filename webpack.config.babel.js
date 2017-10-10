import 'babel-polyfill';
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
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
                  'react',
                  ...(DEBUG ? [] : ['react-optimize']),
                ],
                plugins: [
                  'transform-class-properties',
                  'transform-object-rest-spread',
                  'transform-decorators-legacy',
                  ...(DEBUG ? ['transform-react-jsx-source'] : []),
                  ...(DEBUG ? ['transform-react-jsx-self'] : []),
                ],
              },
            },
          ],
        }, {
          test: /\.styl$/,
          include: [path.join(__dirname, 'src')],
          use: [
            { loader: 'isomorphic-style-loader' },
            { loader: 'css-loader', options: { sourceMap: false, compress: true } },
            { loader: 'stylus-loader' },
          ],
        }, {
          test: /\.pug$/,
          include: [path.join(__dirname, 'src')],
          use: [
            { loader: 'pug-loader' },
          ],
        }, {
          test: /\.(png|jpg|gif)$/,
          include: [path.join(__dirname, 'src')],
          use: [
            { loader: 'url-loader', options: { name: DEBUG ? '[path][name].[ext]?[hash]' : '[hash].[ext]', limit: 1000 } },
          ],
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({ template: 'src/index.pug' }),
      new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', minChunks: (module) => /node_modules/.test(module.resource) }),
      ...DEBUG ? [] : [new webpack.optimize.ModuleConcatenationPlugin()],
      ...DEBUG ? [] : [new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: { screw_ie8: true, warnings: false, unused: true, dead_code: true },
        mangle: { screw_ie8: true },
        output: { comments: false, screw_ie8: true },
      })],
    ],

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
