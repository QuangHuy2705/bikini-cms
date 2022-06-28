const path = require('path')

const config = {
  reactScriptsVersion: 'react-scripts',
  style: {
    sass: {
      loaderOptions: {
        sassOptions: {
          includePaths: ['node_modules', 'src/assets']
        }
      }
    },
    postcss: {
      plugins: [require('postcss-rtl')()]
    }
  },
  webpack: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/@core/assets'),
      '@components': path.resolve(__dirname, 'src/@core/components'),
      '@layouts': path.resolve(__dirname, 'src/@core/layouts'),
      '@store': path.resolve(__dirname, 'src/redux'),
      '@styles': path.resolve(__dirname, 'src/@core/scss'),
      '@configs': path.resolve(__dirname, 'src/configs'),
      '@utils': path.resolve(__dirname, 'src/utility/Utils'),
      '@hooks': path.resolve(__dirname, 'src/utility/hooks')
    }
  }
}

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  config.devServer = {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        secure: false,
        changeOrigin: true,
        logLevel: 'info',
        pathRewrite: { '^/api': '' }
      }
    }
  }
}

module.exports = config
