const webpack = require('webpack');
const path = require('path');
const _ = require('lodash');
const packageJson = require('../package');

module.exports = (callingDirname, entry) => {
  // eslint-disable-next-line no-process-env
  const devBuild = process.env.NODE_ENV !== 'production';

  const config = {
    entry: _.compact([
      'es5-shim/es5-shim',
      'es5-shim/es5-sham',
      entry
    ]),

    output: {
      filename: 'webpack-bundle.js',
      path: path.join(callingDirname, '../app/assets/webpack')
    },

    plugins: _.compact([
      devBuild ? null : new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.EnvironmentPlugin({ NODE_ENV: 'development' })
    ]),
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        // This does not actually appear to be necessary, but it does silence
        // a warning from superagent-no-cache.
        ie: 'component-ie'
      }
    },
    module: {
      loaders: [
        {
          test: require.resolve('react'),
          loader: 'imports-loader?shim=es5-shim/es5-shim&sham=es5-shim/es5-sham'
        },
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: new RegExp(`node_modules/(?!${packageJson.name})`)
        }
      ]
    }
  };

  if (devBuild) {
    console.log('Webpack dev build for Rails'); // eslint-disable-line no-console
    config.devtool = 'eval-source-map';
  } else {
    console.log('Webpack production build for Rails'); // eslint-disable-line no-console
  }

  return config;
};
