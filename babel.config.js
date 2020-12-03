module.exports = function (api) {
    api.cache(true)
  
    const presets = [
     "@babel/preset-env",
     '@babel/preset-react',
     "next/babel"
    ]
    const plugins = [
        '@babel/plugin-transform-runtime',
    ];

    return {
      presets,
      plugins
    }
    
  }