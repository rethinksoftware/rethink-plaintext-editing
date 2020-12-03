module.exports = {
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest",
    },
    "moduleNameMapper": {
        "\\.(css|less|scss|png|jpg)$": "identity-obj-proxy",
        "\\.svg$": "jest-svg-transformer"
      }
  };