const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshTypescript = require('react-refresh-typescript');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';
  return {
    target: 'web',
    entry: {
      main: './src/integrations/main/main.tsx'
    },
    output: {
      path: path.resolve(__dirname, 'public')
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public', 'index.html'),
        filename: !isDevelopment ? '[name].[contenthash].js' : '[name].js'
      })
    ],
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    stats: {
      warnings: true
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
            options: {
              getCustomTransformers: () => ({
                before: [isDevelopment && new ReactRefreshTypescript()].filter(Boolean)
              })
            }
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.svg/,
          type: 'asset/resource'
        }
      ]
    },
    plugins: [
      isDevelopment && new ReactRefreshWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: 'body',
        chunks: ['main']
      }),
      new Dotenv({
        path: `.${env.target}.env`
      })
    ].filter(Boolean),
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },
    devServer: {
      port: 3000,
      host: '0.0.0.0',
      allowedHosts: 'all',
      hot: true,
      client: {
        webSocketURL: {
          port: 3000
        }
      },
      devMiddleware: {
        publicPath: '/'
      },
      proxy: [
        {
          context: ['/api'],
          target: 'http://drivers-api:8080',
          changeOrigin: true,
          secure: false
        },
        {
          context: ['/gamehub'],
          target: 'ws://drivers-api:8080',
          changeOrigin: true,
          secure: false,
          ws: true
        }
      ],
      historyApiFallback: true
    }
  };
};
