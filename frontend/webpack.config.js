const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
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
        liveReload: true
    },
    resolve: {
        extensions: ['.ts', '.js', '.jsx', '.tsx', '...'],
        alias: {
            '@root': path.resolve(__dirname, './'),
            '@shared': path.resolve(__dirname, '../shared')
            
        }
    }
  };