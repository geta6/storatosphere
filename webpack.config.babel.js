import 'babel-polyfill';
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default () => {
  const DEBUG = process.env.NODE_ENV !== 'production';

  return {
    ...(DEBUG ? { performance: { hints: false } } : {}),

    devtool: 'source-map',

    entry: {
      client: ['babel-polyfill', './src/client.jsx'],
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
                presets: [['env', { targets: { browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'] } }], 'react', ...(DEBUG ? [] : ['react-optimize'])],
                plugins: [
                  'transform-class-properties',
                  'transform-object-rest-spread',
                  ...!DEBUG ? [] : [
                    'transform-react-jsx-source',
                    'transform-react-jsx-self',
                  ],
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
      ...DEBUG ? [] : [
        new webpack.optimize.UglifyJsPlugin({ sourceMap: true, minimize: true, compress: { screw_ie8: true, warnings: false, unused: true, dead_code: true }, mangle: { screw_ie8: true }, output: { comments: false, screw_ie8: true } }),
        new webpack.optimize.AggressiveMergingPlugin(),
      ],
    ],

    devServer: {
      contentBase: 'dist',
    },
  };
};
