const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { dir } = require('console');

module.exports = {
    entry: './src/index.tsx',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
          {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: [{
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-typescript', { allowNamespaces: true }]]
              },
            }]
          },
          {
            test: /\.(png|jp(e*)g|gif)$/,
            exclude: /node_modules/,
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
            type: "asset/resource",
          },      {
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: {
              loader: '@svgr/webpack',
              options: {
                typescript: true,
                ref: true
              }
            }
          },
          {
            test: /\.css$/i,
            exclude: /node_modules/,
            include: path.resolve(__dirname, 'src'),
            use: ['style-loader', 'css-loader', 'postcss-loader'],
          },
        ],
          
      },
    plugins: [
        new HtmlWebpackPlugin({
          template: './public/index.html'
        })
      ],
    devServer: {
        hot: true,
        open: false,
        liveReload: true,
        static: {
          directory: path.join(__dirname, 'public'),
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
    },
    resolve: {
        extensions: ['.ts', '.js', '.jsx', '.tsx', '...'],
        alias: {
            '@root': path.resolve(__dirname, './'),
            '@public': path.resolve(__dirname, './public'),
            '@shared': path.resolve(__dirname, '../shared')
            
        }
    }
  };