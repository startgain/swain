const autoprefixer = require('autoprefixer')
const postcss = require('postcss')
const webpack = require('webpack')
const path = require('path')
const pkg = require('./package.json')
const classPrefix = require('postcss-class-prefix')
const TerserPlugin = require('terser-webpack-plugin')

const banner = pkg.name + ' v' + pkg.version + ' ' + pkg.homepage

module.exports = (env, argv) => {
  const config = {
    devtool: 'source-map',
    entry: './src/index.js',
    devServer: {
      static: {
        directory: path.join(__dirname, './'),
      },
      port: 8081,
    },
    output: {
      path: __dirname,
      filename: 'eruda-config.js',
      publicPath: '/assets/',
      library: ['erudaConfig'],
      libraryTarget: 'umd',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              sourceType: 'unambiguous',
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
        },
        {
          test: /\.scss$/,
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    postcss.plugin('postcss-namespace', function () {
                      // Add '.dev-tools .tools ' to every selector.
                      return function (root) {
                        root.walkRules(function (rule) {
                          if (!rule.selectors) return rule

                          rule.selectors = rule.selectors.map(function (
                            selector
                          ) {
                            return '.dev-tools .tools ' + selector
                          })
                        })
                      }
                    }),
                    classPrefix('eruda-'),
                    autoprefixer,
                    ['cssnano', {
                      preset: ['default', {
                        discardComments: {
                          removeAll: true,
                        },
                      }],
                    }],
                  ],
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                // 使用新的 API
                api: 'modern'
              }
            },
          ],
        },
        {
          test: /\.svg$/,
          // 移除 @svgr/webpack，改用简单的资源处理
          type: 'asset/resource',
          generator: {
            filename: 'assets/[name][ext]'
          }
        }
      ],
    },
    plugins: [new webpack.BannerPlugin(banner)],
  }

  if (argv.mode === 'production') {
    config.optimization = {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false,
            },
          },
          extractComments: false,
        }),
      ],
    }
  }

  return config
}
