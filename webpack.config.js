const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  watch: true,
  entry: {
    content: './src/app/content.ts',
    integrations: './src/extension-integrations/app.tsx',
    background: './src/app/background.ts',
    popup: './src/ui/popup.tsx',
  },

  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: '[name].js',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },

  module: {
    rules: [
      {test: /\.tsx?$/, loader: 'ts-loader'},
      {test: /\.css$/, use: ['style-loader', 'css-loader']},
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
};
