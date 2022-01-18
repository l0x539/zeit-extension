const path = require('path');

module.exports = (env) => ({
  mode: 'production',
  // devtool: 'inline-source-map',
  watch: true,
  entry: {
    content: './src/app/content.ts',
    integrations: './src/extension-integrations/app.tsx',
    background: './src/app/background.ts',
    popup: './src/ui/popup.tsx',
  },

  output: {
    path: path.resolve(__dirname, env.browser === 'firefox' ?
        'dist/js' : 'firefox-dist/js'),
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
});
